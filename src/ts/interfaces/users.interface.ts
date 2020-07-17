import mongoose from "mongoose";

export interface Person {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  role: "none" | "student" | "professor";
  email: string;
}

export interface Professor extends Person {
  overallGrade?: number;
  grades?: number[];
  comments?: string[];
}

export interface Student extends Person {
  professorMarks?: ProfessorMark[];
}

export interface ProfessorMark {
  ProfessorId: string | mongoose.Types.ObjectId;
  marked: boolean;
}

export interface IEditProfessor {
  professor: Professor;
  postUpdate: (prof: Professor) => Promise<any>;
}
