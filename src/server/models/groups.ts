import mongoose, { Document, Schema } from "mongoose";
import { Professor, Student } from "../../ts/interfaces/users.interface";

interface IGroupSchema extends Document {
  _id: string;
  name: string;
  lecturer?: Professor;
  students?: Student[];
}

const GroupSchema: Schema = new Schema({
  _id: { type: String, require: true },
  name: { type: String, require: true },
  lecturer: {
    type: {
      _id: { type: String, require: true },
      firstName: { type: String, require: true },
      middleName: { type: String, require: false },
      lastName: { type: String, require: true },
      title: { type: String, require: false },
      role: { type: String, require: true },
      email: { type: String, require: true },
      overallGrade: { type: Number, require: false },
      grades: { type: [Number], require: false },
      comments: { type: [String], require: false },
    },
    require: true,
  },
  students: {
    type: [
      {
        _id: { type: String, require: true },
        firstName: { type: String, require: true },
        middleName: { type: String, require: false },
        lastName: { type: String, require: true },
        title: { type: String, require: false },
        role: { type: String, require: true },
        email: { type: String, require: true },
      },
    ],
    require: true,
  },
});

export const groups = mongoose.model<IGroupSchema>("Groups", GroupSchema);
