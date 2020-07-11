import { Professor } from "./users.interface";

export interface IEditProfessor {
  professor: Professor;
  setProfessor: React.Dispatch<React.SetStateAction<Professor>>;
}
