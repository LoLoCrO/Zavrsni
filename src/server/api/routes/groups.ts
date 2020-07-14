import { groups } from "../../models/groups";
import { students } from "../../models/students";
import { professors } from "../../models/professors";
import { Router } from "express";
import mongoose from "mongoose";
import { Student } from "../../../ts/interfaces/users.interface";

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
        return res.send({ success: false });
      }

      newGroup.save((err, group) => {
        if (err) {
          return res.json({
            success: false,
            err,
            message: "Error!",
          });
        }
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

  router.get("/groups", async (req, res) => {
    const { _id } = req.query;

    if (!_id) {
      return res.send({
        success: false,
        error: "You must provide a Group!",
      });
    }
    const getGroup = await groups
      .findById({ _id })
      .exec()
      .then(async (group) => {
        const groupWithStudents = await students
          .find({
            _id: {
              // @ts-ignore
              $in: group?.students?.map(
                (s: any) => new mongoose.Types.ObjectId(s._id)
              ),
            },
          })
          .then((docs: any) => {
            return { group, groupStudents: docs };
          });
        return groupWithStudents;
      })
      .then(async (doc) => {
        const groupWithLecturer = await professors
          .findById(doc.group?.lecturer, (err: any, obj: any) => {
            if (err) throw err;
            console.log("Lecturer object", obj);
            return obj;
          })
          .exec()
          .then((docs: any) => {
            console.log("Lecturer", doc.group.lecturer, docs);
            return { success: true, ...doc, lecturer: docs };
          });
        return groupWithLecturer;
      })
      .catch((err) => ({
        success: false,
        message: "Error getting group",
        error: err,
      }));
    console.log("finalGroup", getGroup);

    if (!getGroup.success) {
      return res.status(500).json(getGroup);
    }

    const allStudents = await students
      .find()
      .sort({ firstName: 1 })
      .exec()
      .then((students) => ({ success: true, students }))
      .catch((err) => ({
        success: false,
        message: "Error getting groups",
        error: err,
      }));

    if (!allStudents.success) {
      return res.status(500).json(allStudents);
    }

    const allProfessors = await professors
      .find()
      .sort({ firstName: 1 })
      .exec()
      .then((professors) => ({ success: true, professors }))
      .catch((err) => ({
        success: false,
        message: "Error getting groups",
        error: err,
      }));

    if (!allProfessors.success) {
      return res.status(500).json(allProfessors);
    }

    return res.status(200).json({
      getGroup,
      allStudents,
      allProfessors,
      success: true,
    });
  });

  router.post("/groups/populate", async (req, res) => {
    const { group } = req.body;

    console.log("Ulaz", group);

    const newStudents = group.students
      .filter((student: Student) => {
        const marks = student.professorMarks;
        console.log(marks);
        if (!marks) {
          return student._id;
        } else if (
          !marks.find((mark) => mark.ProfessorId === group.lecturer._id)
        ) {
          return student._id;
        } else return null;
      })
      .filter((val: any) => val !== null);

    const newGroup = await groups
      .findByIdAndUpdate(
        { _id: group._id },
        {
          $unset: {
            ...(!group.lecturer ? { lecturer: '' } : {}),
          },
          $set: {
            ...(group.lecturer ? { lecturer: group.lecturer._id } : {}),
            students: group.students.map(
              (s: any) => new mongoose.Types.ObjectId(s._id)
            ),
          },
        }
      )
      .then((g: any) => {
        console.log("delete g.lecturer before", g);
        if (!group.lecturer) {
        console.log("deleteting", g.lecturer);
          delete g.lecturer;
        }
        console.log("delete g.lecturer after", g);

        return g;
      })
      .catch((err) => console.log(err));

    if (newGroup.success) {
      return res.status(500).json({ success: false });
    }

    console.log("newGroup", newGroup, newGroup.lecturer, newGroup.students);

    if (newStudents.length && newGroup.lecturer.length) {
      const _id: string = newGroup.lecturer;
      students
        .updateMany(
          {
            _id: {
              $in: newStudents,
            },
          },
          {
            $set: {
              professorMarks: {
                _id,
                marked: false,
              },
            },
          }
        )
        .then((data) => {
          console.log("Izlaz studenata", data);
          return res.json({ success: true, ...data });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ success: false, err });
        });
    }
  });
};

export default Groups;
