export interface Person {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  email: string;
}

export interface Professor extends Person {
  overallGrade: number;
  grades: number[];
  comments: string[];
}

export interface Student extends Person {
  _id: string;
  email: string;
  professorMarks?: ProfessorMark[];
}

export interface ProfessorMark {
  ProfessorId: string;
  marked: boolean;
}

export interface IEditProfessor {
  professor: Professor;
  setProfessor: React.Dispatch<React.SetStateAction<Professor>>;
}
