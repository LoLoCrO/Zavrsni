require("dotenv").config();

import { users } from "../../models/users";
import { Router } from "express";
import jwt from "jsonwebtoken";

const Auth = (router: Router) => {
  router.post("/auth", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    users
      .findOne({ email, password })
      .then(async (user) => {
        if (!user) {
          return res.json({
            message: `User: ${email + ` ` + password} not found`,
          });
        }
        // @ts-ignore add password to user
        else if (user.password !== password) {
          return res.json({ message: "Incorrect Password" });
        } else {
          const token = jwt.sign(
            { email, password },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "1h" }
          );
          res.setHeader("Authorization", `Bearer ${token}`);
          return res.json({ token, user });
        }
      })
      .catch((err) => console.log({ err }))
      .finally(() => {});
  });
};

export default Auth;
