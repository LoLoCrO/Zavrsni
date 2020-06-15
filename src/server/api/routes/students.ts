import { students } from "../../models/students";
import { Router } from "express";

const Students = (router: Router) => {
  router.post("/students", (req, res) => {
    const { body } = req;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a student!",
      });
    }
    const group = new students(body);

    if (!group) {
      return res.status(400).json({ success: false });
    }

    group
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          group: group,
          message: "student saved!",
        });
      })
      .catch((err: any) => {
        return res.status(400).json({
          err,
          message: "student not saved!",
        });
      });
  });

  router.get("/students", (_req, res) => {
    students
      .find()
      .sort({ lastName: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting students",
          error: err,
        })
      );
  });

  router.get("/students/:id", (_req, res) => {
    students
      .find({ _id: _req.params.id })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting student",
          error: err,
        })
      );
  });

  router.post("/students/:id", (req, res) => {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    students
      .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting student",
          error: err,
        })
      );
  });

  router.delete("/students/:id", (req, res) => {
    students
      .findByIdAndDelete(req.params.id)
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Error getting student",
          error: err,
        })
      );
  });
};

export default Students;
