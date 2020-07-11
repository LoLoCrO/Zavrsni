import { groups } from "../../models/groups";
import { students } from "../../models/students";
import { professors } from "../../models/professors";
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
        console.log("Doc", doc, doc.group?.lecturer, doc.group?.lecturer?._id);
        const groupWithLecturer = await professors
          .findOne({
            // @ts-ignore
            _id: new mongoose.Schema.Types.ObjectId(doc.group?.lecturer),
          })
          .lean()
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

    const newGroup = await groups
      .findByIdAndUpdate(
        { _id: group._id },
        {
          $set: {
            lecturer: group.lecturer._id,
            students: group.students.map(
              (s: any) => new mongoose.Types.ObjectId(s._id)
            ),
          },
        }
      )
      .then((g: any) => {
        // console.log("findone");
        // console.log(group);
        // g.lecturer.set(group.lecturer._id);
        // group.students.forEach((s: any) =>
        //   g.students.push(new mongoose.Schema.Types.ObjectId(s._id))
        // );
        // g.save();
        return g;
      })
      .catch(
        (err) => console.log(err)
        // res.json({
        //   message: "Error updating group!",
        //   error: err,
        // })
      );

    console.log(newGroup);
    if (
      newGroup &&
      newGroup.lecturer &&
      newGroup.lecturer._id.length &&
      newGroup.students?.length
    ) {
      students
        .updateMany(
          {
            _id: {
              $in: group.students.map(
                (student: any) => student._id
                // new mongoose.Schema.Types.ObjectId(student._id)
              ),
            },
          },
          {
            $push: {
              professorMarks: {
                ProfessorId: newGroup.lecturer._id,
                marked: false,
              },
            },
          }
        )
        .then((data) => console.log("Izlaz studenata", data))
        .catch((err) => console.log(err));
    }
    // res.status(200).json({ success: true, group })
    // return res.json({ success: true, group });
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
