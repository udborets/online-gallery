import { IUserSlice } from "./IUserSlice";

export interface IStore {
  user: IUserSlice;
  notification: {
    isActive: boolean;
    setIsActive: (isActive: boolean) => any;
  };
}
