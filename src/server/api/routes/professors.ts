import { professors } from "../../models/professors";
import { Router } from "express";

const Professors = (router: Router) => {
  router.post("/professors", (req, res) => {
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a professor!",
      });
    }
    const group = new professors(body);

    if (!group) {
      return res.status(400).json({ success: false });
    }

    group
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          group: group,
          message: "Professor saved!",
        });
      })
      .catch((err: any) => {
        return res.status(400).json({
          err,
          message: "Professor not saved!",
        });
      });
  });

  router.get("/professors", (_req, res) => {
    professors
      .find()
      .sort({ lastName: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting professors",
          error: err,
        })
      );
  });

  router.get("/professors/:id", (_req, res) => {
    professors
      .find({ _id: _req.params.id })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting professor",
          error: err,
        })
      );
  });

  router.post("/professors/:id", (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    professors
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting professor",
          error: err,
        })
      );
  });

  router.delete("/professors/:id", (req, res) => {
    professors
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

export default Professors;
