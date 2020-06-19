import { users } from "../../models/users";
import { Router } from "express";

const Users = (router: Router) => {
 
  router.post("/users", (req, res) => {
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a user!",
      });
    }
    const group = new users(body);

    if (!group) {
      return res.status(400).json({ success: false });
    }

    group
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          group: group,
          message: "User saved!",
        });
      })
      .catch((err: any) => {
        return res.status(400).json({
          err,
          message: "Professor not saved!",
        });
      });
  });

  router.get("/users", (_req, res) => {
    users
      .find()
      .sort({ lastName: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting users",
          error: err,
        })
      );
  });

  router.get("/users/:id", (_req, res) => {
    users
      .find({ _id: _req.params.id })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting users",
          error: err,
        })
      );
  });

  router.post("/users/:id", (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    users
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting professor",
          error: err,
        })
      );
  });

  router.delete("/users/:id", (req, res) => {
    users
      .findByIdAndDelete(req.params.id)
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting professor",
          error: err,
        })
      );
  });
};

export default Users;
