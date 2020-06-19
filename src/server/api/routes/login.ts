require("dotenv").config();

import { users } from "../../models/users";
import { Router } from "express";
import jwt from "jsonwebtoken";

const Login = (router: Router) => {
  router.get("/token", (req, res) => {
    const { email, password } = req.body;
    users.findOne({ email, password }).then((user) => {
      if (!user) {
        return res.sendStatus(404).json({ message: "Student not found" });
      }
      // @ts-ignore add password to user
      else if (user.password !== password) {
        return res.sendStatus(403).json({ message: "Incorrect Password" });
      } else {
        const token = jwt.sign(
          { email, password },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "1h" }
        );
        res.header("Authorization", `Bearer ${token}`);
        // return it back
        res.status(200).json({ token, email, password });
      }
    });
  });

  // router.post("/students", (req, res) => {
  //   const { body } = req;

  //   if (!body) {
  //     return res.status(400).json({
  //       success: false,
  //       error: "You must provide a student!",
  //     });
  //   }
  //   const group = new students(body);

  //   if (!group) {
  //     return res.status(400).json({ success: false });
  //   }

  //   group
  //     .save()
  //     .then(() => {
  //       return res.status(201).json({
  //         success: true,
  //         group: group,
  //         message: "student saved!",
  //       });
  //     })
  //     .catch((err: any) => {
  //       return res.status(400).json({
  //         err,
  //         message: "student not saved!",
  //       });
  //     });
  // });

  // router.get("/students/:id", (_req, res) => {
  //   students
  //     .find({ _id: _req.params.id })
  //     .exec()
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) =>
  //       res.status(500).json({
  //         message: "Error getting student",
  //         error: err,
  //       })
  //     );
  // });
};

export default Login;
