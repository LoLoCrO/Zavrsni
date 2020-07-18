import { students } from "../../models/students";
import { Router } from "express";
import { professors } from "../../models/professors";
import mongoose from "mongoose";

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

  router.get("/students/lecturers", async (req, res) => {
    const { _id } = req.query;
    const student = await students
      .findById({ _id })
      .exec()
      .then((student) => {
        console.log("lecturers aaaa", student);
        return student;
      })
      .catch((err) => {
        console.log(err, "2");
        return null;
      });

    console.log("Student Query res", student);

    if (student && typeof student.professorMarks !== "undefined") {
      const lecturers = await professors
        .find({
          _id: {
            $in: student.professorMarks.map((mark: any) => mark._id),
          },
        })
        .exec()
        .then((data: any) => {
          console.log(data);
          return data;
        })
        .catch((err) => console.log(err));

      if (lecturers) {
        console.log("RADI", { studentMarks: student.professorMarks });
        return res.json({
          success: true,
          lecturers,
          studentMarks: student.professorMarks,
        });
      }
    } else
      return res.json({
        success: false,
        message: "Student/student lecturer not found",
      });
  });

  router.post("/students/:id", (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }

    students
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
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
