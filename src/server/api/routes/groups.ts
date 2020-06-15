import { groups } from "../../models/groups";
import { Router } from "express";

const Groups = (router: Router) => {
  router.post("/groups", (req, res) => {
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a Group!",
      });
    }
    const group = new groups(body);

    if (!group) {
      return res.status(400).json({ success: false });
    }

    group
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          group: group,
          message: "Group saved!",
        });
      })
      .catch((err: any) => {
        return res.status(400).json({
          err,
          message: "Group not saved!",
        });
      });
  });

  router.get("/groups", (_req, res) => {
    groups
      .find()
      .sort({ name: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting groups",
          error: err,
        })
      );
  });

  router.get("/groups/:id", (_req, res) => {
    groups
      .find({ _id: _req.params.id })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting group",
          error: err,
        })
      );
  });

  router.post("/groups/:id", (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    groups
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting group",
          error: err,
        })
      );
  });

  router.delete("/groups/:id", (req, res) => {
    groups
      .findByIdAndDelete(req.params.id)
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting group",
          error: err,
        })
      );
  });
};

export default Groups;
