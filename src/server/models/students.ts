import mongoose, { Document, Schema } from "mongoose";
import { ProfessorMark } from "../../ts/interfaces/users.interface";

interface IStudentSchema extends Document {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  role: string;
  email: string;
  password: string;
  professorMarks?: ProfessorMark[];
}

const StudentSchema: Schema = new Schema({
  _id: { type: String, require: true },
  firstName: { type: String, require: true },
  middleName: { type: String, require: false },
  lastName: { type: String, require: true },
  title: { type: String, require: false },
  role: { type: String, require: true },
  email: { type: String, require: true },
  professorMarks: {
    type: [
      {
        _id: { type: String, require: true },
        marked: { type: Boolean, require: true },
      },
    ],
    required: false,
  },
});

export const students = mongoose.model<IStudentSchema>(
  "Students",
  StudentSchema
);
