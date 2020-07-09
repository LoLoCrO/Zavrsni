import { groups } from "../../models/groups";
import { Router } from "express";
import mongoose from "mongoose";

const Groups = (router: Router) => {
  router.post("/groups/new", (req, res) => {
    const { name } = req.body;

    try {
      if (!name) {
        return res.send({
          success: false,
          error: "You must provide a Group!",
        });
      }

      groups.find({ name }).then((data) => {
        if (data.length > 0) {
          return res.json({
            success: false,
            message: "Group already existis!",
          });
        }
      });

      const newGroup = new groups({ _id: new mongoose.mongo.ObjectID(), name });

      if (!newGroup) {
        console.log("Groups route, no Group created line 17");
        return res.send({ success: false });
      }

      newGroup.save((err, group) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            err,
            message: "Error!",
          });
        }
        console.log(group + " saved to groups collection.");
        return res.json({
          success: true,
          group,
          message: "Group saved!",
        });
      });
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/groups/all", (_req, res) => {
    groups
      .find()
      .sort({ name: 1 })
      .exec()
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting groups",
          error: err,
        })
      );
  });

  router.post("/groups/update", (req, res) => {
    const { name, _id } = req.body;

    if (!name && !_id) {
      return res.send({
        success: false,
        error: "You must provide a Group!",
      });
    }

    groups
      .findByIdAndUpdate({ _id }, { name }, { new: true })
      .then((group) => res.status(200).json({ success: true, group }))
      .catch((err) =>
        res.status(500).json({
          message: "Error updating group!",
          error: err,
        })
      );
  });

  router.delete("/groups", (req, res) => {
    const { _id } = req.body;

    if (!_id) {
      return res.send({
        success: false,
        error: "You must provide a Group!",
      });
    }
    groups
      .findByIdAndDelete({ _id })
      .then((group) => res.status(200).json({ success: true, group }))
      .catch((err) =>
        res.status(500).json({
          message: "Error deleting group",
          error: err,
        })
      );
  });

  router.patch("/groups", (req, res) => {
    const { _id } = req.body;

    if (!_id) {
      return res.send({
        success: false,
        error: "You must provide a Group!",
      });
    }
    groups
      .findByIdAndDelete({ _id })
      .then((group) => res.status(200).json({ success: true, group }))
      .catch((err) =>
        res.status(500).json({
          message: "Error deleting group",
          error: err,
        })
      );
  });

  router.get("/groups", (req, res) => {
    const { _id } = req.query;

    if (!_id) {
      return res.send({
        success: false,
        error: "You must provide a Group!",
      });
    }
    groups
      .findById({ _id })
      .exec()
      .then((group) => res.status(200).json({ success: true, group }))
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "Error getting group",
          error: err,
        })
      );
  });

  // router.post("/groups/:id", (req, res) => {
  //   const body = req.body;

  //   if (!body) {
  //     return res.status(400).json({
  //       success: false,
  //       error: "You must provide a body to update",
  //     });
  //   }

  //   groups
  //     .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) =>
  //       res.status(500).json({
  //         message: "Error getting group",
  //         error: err,
  //       })
  //     );
  // });

  // router.delete("/groups/:id", (req, res) => {
  //   groups
  //     .findByIdAndDelete(req.params.id)
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) =>
  //       res.status(500).json({
  //         message: "Error getting group",
  //         error: err,
  //       })
  //     );
  // });
};

export default Groups;
