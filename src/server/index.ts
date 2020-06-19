import express, { Request, Response } from "express";
import next from "next";
import parseArgs from "minimist";
import bodyParser from "body-parser";
import routes, { routesType } from "./routes";
import mongoose from "mongoose";
import router from "./api";
import { connectionString } from "./config/serverSettings";
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

  server.use(bodyParser.json());
  server.use(cors);
  server.use(authenticateToken);
  server.use(authorizeUser);
  server.use("/api", router);

  routes.forEach(({ path, pageToRender }: routesType) =>
    server.get(path, render(pageToRender))
  );

  server.get("*", (req, res) => handle(req, res));

  try {
    db.once("open", () => {
      console.log("Opened Connection To MongoDB!");
      server.listen(argv.port, (err: Error) => {
        if (err) throw err;
        console.log("Listening on port " + argv.port + "!");
      });
    });
  } catch (err) {
    console.error(`Unhandled server exception: ${err.message}`, err);
  }
});
