import mongoose, { Document, Schema } from "mongoose";
import { Professor, Student } from "../../ts/interfaces/users.interface";

interface IGroupSchema extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  lecturer?: Professor;
  students?: Student[];
}

const GroupSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, require: false },
  name: { type: String, require: true },
  lecturer: { type: Schema.Types.ObjectId, ref: "Professors" },
  // {
  //   type: {
  //     _id: { type: Schema.Types.ObjectId, require: true },
  //     firstName: { type: String, require: true },
  //     middleName: { type: String, require: false },
  //     lastName: { type: String, require: true },
  //     title: { type: String, require: false },
  //     role: { type: String, require: true },
  //     email: { type: String, require: true },
  //     overallGrade: { type: Number, require: false },
  //     grades: { type: [Number], require: false },
  //     comments: { type: [String], require: false },
  //   },
  //   require: false,
  // }
  students: [{ type: Schema.Types.ObjectId, ref: "Students" }],
  //  {
  //   type: [
  //     {
  //       _id: { type: Schema.Types.ObjectId, require: true },
  //       firstName: { type: String, require: true },
  //       middleName: { type: String, require: false },
  //       lastName: { type: String, require: true },
  //       title: { type: String, require: false },
  //       role: { type: String, require: true },
  //       email: { type: String, require: true },
  //     },
  //   ],
  //   require: false,
  // }
});

export const groups = mongoose.model<IGroupSchema>("Groups", GroupSchema);
