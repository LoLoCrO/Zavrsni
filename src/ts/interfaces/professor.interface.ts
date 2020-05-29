export interface Professor {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  overallGrade: number;
  grades: number[];
  comments: string[];
}

export interface IEditProfessor {
  professor: Professor;
  setProfessor: React.Dispatch<React.SetStateAction<Professor>>;
}
