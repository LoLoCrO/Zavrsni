import { Request, Response, NextFunction } from "express";
import routes from "../../routes";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const currentRoute = routes.find((route) =>
    req.path.toLowerCase().includes(route.pageToRender.toLowerCase())
  );

  console.log(currentRoute);
  if (!currentRoute) {
    console.log("Ruta ne postoji");
    res.status(404).send({ message: "Ruta ne postoji" });
    return next();
  } else {
    if (currentRoute.path === "/login" && !req.headers.authorization)
      return next();
    const { user } = req.body;
    if (!user) {
      console.log("Korisnik ne postoji");
      res.status(404).send({ message: "Korisnik ne postoji" });
      return next();
    } else if (user.role !== currentRoute.role) {
      console.log("Korisnik nema pravo pristupiti ruti!");
      console.log("user.role !== routeRole.role", user, currentRoute.role);
      res.status(403).send({ message: "Korisnik nema pravo pristupiti ruti!" });
      return next();
    } else next();
  }
};
export default authorizeUser;
