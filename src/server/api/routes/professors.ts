import { professors } from "../../models/professors";
import { students } from "../../models/students";
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

  router.post("/professors/questionnaire", async (req, res) => {
    const { _id, student_id, grade, comment, updatedMarks } = req.body;
    await professors
      .findById(_id)
      .lean()
      .exec()
      .then(async (professor) => {
        if (professor) {
          const currentGrade =
            grade.reduce(
              (accumulator: number, currentValue: number) =>
                accumulator + currentValue
            ) / 10;

          const divider = professor.grades ? professor.grades.length + 1 : 1;

          const newOverallGrade = professor.grades?.length
            ? (professor.grades.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              ) +
                currentGrade) /
              divider
            : currentGrade;

          const newGrades = professor.grades
            ? professor.grades.map((n: number) => n)
            : [currentGrade];
          newGrades.push(currentGrade);

          return await professors
            .findByIdAndUpdate(
              { _id },
              {
                overallGrade: parseFloat(newOverallGrade.toFixed(2)),
                grades: newGrades,
                $push: {
                  comments: comment,
                },
              },
              { new: true }
            )
            .lean()
            .then(async (professor: any) => {
              console.log("Route p/q", professor);
              return await students
                .findByIdAndUpdate(
                  {
                    _id: student_id,
                  },
                  {
                    $set: {
                      professorMarks: updatedMarks,
                    },
                  },
                  { new: true }
                )
                .then((data) => res.json({ success: true, data }))
                .catch((err) => {
                  console.log("Marking", err);
                  return res.json({ success: true });
                });
            })
            .catch((err: any) => {
              const tempError = {
                ok: 0,
                code: 2,
                codeName: "BadValue",
                name: "MongoError",
              };
              console.log("err === tempError", err === tempError);
              if (err === tempError) {
                return {
                  message: "Error updating professor OK",
                  success: true,
                  err,
                };
              } else
                return {
                  message: "Error updating professor",
                  success: false,
                  err,
                };
            });
        } else
          return res.json({
            success: false,
            message: "Error getting professor",
          });
      })
      .catch((err) => {
        console.log("No result", err);
        return null;
      });
  });

  router.patch("/professors/update", (req, res) => {
    const body = req.body;
    const { _id } = body;
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
