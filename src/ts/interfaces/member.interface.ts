import { Person, Student, Professor } from "./users.interface";

export interface Member {
  _id: string;
  role: "none" | "student" | "professor";
  email: string;
}

export interface MemberModalBody {
  member: Member | Person | Student | Professor;
  handleClose: () => void;
  edit: (member: Member | Person | Student | Professor) => void;
}

export interface IAddForm {
  groups: Member[];
  member: Member | Person | Student | Professor | null;
  edit: (member: Member | Person | Student | Professor) => void;
}

export interface IMemberMenu {
  member: Member | Person | Student | Professor;
  openModal: (member: Member | Person | Student | Professor) => void;
  remove: (id: string) => void;
}

export interface IMemberModal {
  open: boolean;
  member: Member | Person | Student | Professor;
  handleClose: () => void;
  edit: (member: Member | Person | Student | Professor) => void;
}
