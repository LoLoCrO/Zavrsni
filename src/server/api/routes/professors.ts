import { professors } from "../../models/professors";
import { Router } from "express";
import mongoose from "mongoose";

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

  router.get("/professors", (req, res) => {
    professors
      .find()
      .sort({ lastName: 1 })
      .exec()
      .then((professors) => res.status(200).json({ success: true, professors }))
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: "Error getting professors",
          error: err,
        })
      );
  });

  router.get("/professors/profile", (req, res) => {
    const { _id } = req.params;
    professors
    // @ts-ignore
      .find({ _id: new mongoose.Types.ObjectId(_id) })
      .exec()
      .then((professor: any) => res.status(200).json({ success: true, professor }))
      .catch((err: any) =>
        res.status(500).json({
          success: false,
          message: "Error getting professor",
          error: err,
        })
      );
  });

  router.patch("/professors/update", (req, res) => {
    const body = req.body;
    const { _id } = body;
    console.log("SVE", body, _id);
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    professors
      .findByIdAndUpdate({ _id }, body, {
        new: true,
      })
      .then((professor) => res.status(200).json({ success: true, professor }))
      .catch((err) =>
        res.status(500).json({
          success: false,
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
