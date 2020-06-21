import { groups } from "../../models/groups";
import { Router } from "express";

const Groups = (router: Router) => {
  router.post("/groups", (req, res) => {
    const { group } = req.body;
    console.log("Groups route", req.body);
    
    try {
      if (!group) {
        return res.send({
          success: false,
          error: "You must provide a Group!",
        });
      }
      const newGroup = new groups(group);

      if (!newGroup) {
        console.log("Groups route, no Group created line 17");
        return res.send({ success: false });
      }

      newGroup
        .save()
        .then((data) => {
          return res.json({
            success: true,
            group: data,
            message: "Group saved!",
          });
        })
        .catch((err) => {
          return res.json({
            err,
            message: "Group not saved!",
          });
        });
    } catch (err) {
      console.log(err);
    } finally {
      return;
    }
  });

  // router.get("/groups", (_req, res) => {
  //   groups
  //     .find()
  //     .sort({ name: 1 })
  //     .exec()
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) =>
  //       res.status(500).json({
  //         message: "Error getting groups",
  //         error: err,
  //       })
  //     );
  // });

  // router.get("/groups/:id", (_req, res) => {
  //   groups
  //     .find({ _id: _req.params.id })
  //     .exec()
  //     .then((docs) => res.status(200).json(docs))
  //     .catch((err) =>
  //       res.status(500).json({
  //         message: "Error getting group",
  //         error: err,
  //       })
  //     );
  // });

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
