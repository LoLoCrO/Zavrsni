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
  students: [{ type: Schema.Types.ObjectId, ref: "Students" }],
});

export const groups = mongoose.model<IGroupSchema>("Groups", GroupSchema);
