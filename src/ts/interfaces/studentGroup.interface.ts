import { Professor, Student } from "./users.interface";

export interface StudentGroup {
  _id: string;
  name: string;
  lecturer?: Professor;
  students?: Student[];
}

export interface AddStudentsForm {
  students: Student[];
  currentGroup: Student[];
  add: (student: Student) => void;
  save: () => any;
}

export interface IBody {
  groupName: StudentGroup | null;
  handleClose: () => void;
  addOrEditGroup: ({ _id, name }: StudentGroup) => void;
}

export interface IAddForm {
  groups: StudentGroup[];
  groupName: StudentGroup | null;
  addOrEditGroup: ({ _id, name }: StudentGroup) => void;
}

export interface IGroupMenu {
  group: StudentGroup;
  openModal: (id?: string | undefined) => void;
  removeGroup: (id: string) => void;
}

export interface IGroupModal {
  open: boolean;
  groupName: StudentGroup | null;
  handleClose: () => void;
  addOrEditGroup: ({ _id, name }: StudentGroup) => void;
}
