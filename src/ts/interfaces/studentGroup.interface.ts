export interface StudentGroup {
  _id: string;
  name: string;
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
