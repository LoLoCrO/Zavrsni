import mongoose, { Document, Schema } from "mongoose";

interface IUserSchema extends Document {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  role: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, require: true },
  firstName: { type: String, require: true },
  middleName: { type: String, require: false },
  lastName: { type: String, require: true },
  title: { type: String, require: true },
  role: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

export const users = mongoose.model<IUserSchema>("Users", UserSchema);
