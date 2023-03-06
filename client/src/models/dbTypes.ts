
type Role = {
  BASIC: "BASIC";
  ADMIN: "ADMIN";
};

export type IdbUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
