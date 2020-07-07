import { students } from "../../models/students";
import { Router } from "express";
import { professors } from "../../models/professors";

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
    console.log("Student id", req.query);

    const student = await students
      .findById({ _id: req.query._id })
      .exec()
      .then((lecturers) => {
        console.log("lecturers aaaa", lecturers);
        return lecturers;
      })
      .catch((err) => {
        console.log(err, "2");
        return res.json({ err });
      });

    console.log("STUDENT 0", student);

    // if (student._id.length) {
    //   if (student.professorMarks) {
    //     const lecturersIDs: string[] = student.professorMarks.map(
    //       ({ ProfessorId }) => ProfessorId
    //     );
    //     const stpr = await professors
    //       .find()
    //       .where("_id")
    //       .in(lecturersIDs)
    //       .exec((err, records) => {
    //         console.log(err, records, "svasta");
    //         return err ? err : records;
    //       });
    //     console.log("STPR", stpr);
    //     // .then((data) => {
    //     //   console.log(data);
    //     //   return data;
    //     //   // return res.json({ data });
    //     // })
    //     // .catch((err) => {
    //     //   console.log(err);
    //     //   return err;
    //     //   // return res.json({ err });
    //     // });
    //   }
    // }

    // students
    //   .find()
    //   .sort({ lastName: 1 })
    //   .exec()
    //   .then((docs) => res.status(200).json(docs))
    //   .catch((err) =>
    //     res.status(500).json({
    //       message: "Error getting students",
    //       error: err,
    //     })
    //   );
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
