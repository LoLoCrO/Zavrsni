export interface Member {
  _id: string;
  role: "none" | "student" | "professor";
  email: string;
}

export interface MemberModalBody {
  member: Member;
  handleClose: () => void;
  edit: ({ _id, email }: Member) => void;
}

export interface IAddForm {
  groups: Member[];
  member: Member | null;
  edit: ({ _id, email }: Member) => void;
}

export interface IMemberMenu {
  member: Member;
  openModal: (member: Member) => void;
  remove: (id: string) => void;
}

export interface IMemberModal {
  open: boolean;
  member: Member;
  handleClose: () => void;
  edit: ({ _id, email }: Member) => void;
}
