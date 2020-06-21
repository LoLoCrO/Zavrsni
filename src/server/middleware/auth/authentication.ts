import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { publicPaths } from "../../routes";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/" || publicPaths.find((path) => req.path.includes(path))) {
    console.log("1 - public");
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) {
          console.log("2", err);
          return res.sendStatus(403);
        } else {
          console.log("3");
          req.body.user = Object.assign({}, user);
          return next();
        }
      });
    }
  } catch (err) {
    console.log("4");
    return res.json({ msg: err.message });
  }
};

export default authenticateToken;
