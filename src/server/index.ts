import express, { Request, Response } from "express";
import next from "next";
import parseArgs from "minimist";
import bodyParser from "body-parser";
import { routesType, adminRoutes, studentRoutes, publicPaths } from "./routes";
import mongoose from "mongoose";
import router from "./api";
import { connectionString, userRoles } from "./config/serverSettings";
import { UAParser } from "ua-parser-js";
import cors from "./middleware/cors";
import authenticateToken from "./middleware/auth/authentication";
import authorizeUser from "./middleware/auth/authorization";

const env = process.env.NODE_ENV;

const argv = parseArgs(process.argv.slice(2), {
  alias: { p: "port" },
  boolean: ["h"],
  default: { p: 3000 },
});

const app = next({ dev: env === "development" });

const handle = app.getRequestHandler();

const agentDetector = (pageToRender: string) => (
  req: Request,
  res: Response
) => {
  const { getDevice } = new UAParser(req.headers["user-agent"]);
  const device = getDevice().type || "desktop";
  return app.render(req, res, `/${pageToRender}`, { ...req.query, device });
};

const render = (pageToRender: string) => agentDetector(pageToRender);

app.prepare().then(() => {
  const server = express();

  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log("Connection error: ", err.message));

  const db = mongoose.connection;

  server.use(cors);
  server.use(bodyParser.json());
  server.use("/api", router);

  adminRoutes.forEach(({ path, pageToRender }: routesType) =>
    server.use(
      path,
      authenticateToken,
      authorizeUser(userRoles.admin),
      render(pageToRender)
    )
  );

  studentRoutes.forEach(({ path, pageToRender }: routesType) =>
    server.use(
      path,
      authenticateToken,
      authorizeUser(userRoles.student),
      render(pageToRender)
    )
  );

  publicPaths.forEach((path: string) => server.get(path));

  server.get("*", (req, res) => handle(req, res));

  try {
    db.once("open", () => {
      console.log("Opened Connection To MongoDB!");
      server.listen(argv.port, (err: Error) => {
        if (err) throw err;
        console.log("Listening on port " + argv.port + "!");
      });
    }).addListener("error", (err: Error) => console.log(err));
  } catch (err) {
    console.error(`Unhandled server exception: ${err.message}`, err);
  }
});
