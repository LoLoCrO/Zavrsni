import mongoose, { Document, Schema } from "mongoose";

interface IProfessorSchema extends Document {
  _id: Schema.Types.ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  role: string;
  email: string;
  password: string;
  overallGrade?: number;
  grades?: number[];
  comments?: string[];
}

const ProfessorSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, require: true },
  firstName: { type: String, require: true },
  middleName: { type: String, require: false },
  lastName: { type: String, require: true },
  title: { type: String, require: true },
  role: { type: String, require: true },
  email: { type: String, require: true },
  overallGrade: { type: String, require: false },
  grades: { type: [Number], require: false },
  comments: { type: [String], require: false },
});

export const professors = mongoose.model<IProfessorSchema>(
  "Professors",
  ProfessorSchema
);
