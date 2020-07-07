import { Request, Response, NextFunction } from "express";

const authorizeUser = (role: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.user.role === role) {
    return next();
  } else return res.status(401).json({ message: "Unauthorized" });
};

export default authorizeUser;
