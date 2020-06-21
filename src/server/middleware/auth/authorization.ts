import { Request, Response, NextFunction } from "express";
import routes from "../../routes";
import { publicPaths } from "../../routes";
import router from "../../api/index";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/login") {
    console.log("1/login");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (typeof token === "undefined") {
      console.log("2/login");
      return next();
    } else {
      console.log("3/login");
      const { user } = req.body;
      if (user.role === "admin") {
        console.log("4/login");
        res.redirect("/adminHome");
        return next();
      } else {
        console.log("5/login");
        res.redirect("/studentHome");
        return next();
      }
    }
  }

  const currentRoute =
    routes.find(({ path }) =>
      req.path.toLowerCase().includes(path.toLowerCase())
    ) ||
    publicPaths.find((path) => req.path.includes(path)) ||
    router.stack
      .map(({ route }) => route.path)
      .find((path) => req.path.includes(path));

  if (!currentRoute) {
    console.log("6/login");
    return res.send({ message: "Ruta ne postoji" });
  } else {
    console.log("7/login");
    if (publicPaths.find((path) => req.path.includes(path))) {
      console.log("8/login");
      return next();
    }
    const { user } = req.body;
    if (!user) {
      console.log("9/login");
      return res.send({ message: `Auth: Korisnik ne postoji` });
    } else if (user.role !== currentRoute.role) {
      console.log("10/login");
      return res.send({ message: "Korisnik nema pravo pristupiti ruti!" });
    } else {
      console.log("11/login");
      next();
    }
  }
};
export default authorizeUser;
