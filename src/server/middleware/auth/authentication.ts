import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const publicPaths = [
  '/',
  '/login',
  '/api/token',
  '/_next/static/runtime/main.js',
  '/_next/static/runtime/webpack.js',
  '/_next/static/development/pages/_app.js',
  '/_next/static/development/pages/login.js',
  '/_next/static/runtime/react-refresh.js',
  '/_next/static/development/_buildManifest.js',
  '/_next/static/development/_ssgManifest.js',
  '/favicon.ico'
  
];

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("auth", req.path);
  // console.log("auth", req);
  // login does not require jwt verification
  if (req.path === '/' || req.path === "/login" || req.path === "/api/token") {
    return next();
  }
  // get token from request header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);
  // Token verification
  try {
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
        if (err) return res.sendStatus(403);
        req.body.user = Object.assign({}, user);
        req.body.token = token;
      });
    }
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.sendStatus(401).json({ msg: err.message });
  }

  // next middleware
  next();
};

export default authenticateToken;
