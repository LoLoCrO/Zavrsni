require("dotenv").config();

import { admins } from "../../models/admins";
import { students } from "../../models/students";
import { Router } from "express";
import jwt from "jsonwebtoken";

const Auth = (router: Router) => {
  router.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const admin = await admins
      .findOne({ email, password })
      .then(async (user) => {
        if (!user) {
          return null;
        } else if (user.password !== password) {
          return res.json({
            message: `Incorrect Password admin db pass: ${user.password} your: ${password}`,
          });
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
      .catch((err) => console.log({ err }));

    if (!admin) {
      students
        .findOne({ email, password })
        .exec()
        .then((user) => {
          if (!user) {
            return res.json({
              message: `User: ${email + ` ` + password} not found`,
            });
          } else {
            if (user.password !== password) {
              return res.json({
                message: `Incorrect Password`,
              });
            }
            const token = jwt.sign(
              { email, password },
              process.env.ACCESS_TOKEN_SECRET!,
              { expiresIn: "1h" }
            );
            res.setHeader("Authorization", `Bearer ${token}`);
            return res.json({ user });
          }
        })
        .catch((err) => console.log({ err }));
    }
  });
};

export default Auth;
