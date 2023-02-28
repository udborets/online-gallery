import { IUserSlice } from "./IUserSlice";

export interface IStore {
  user: IUserSlice;
  modal: {
    isActive: boolean;
    setIsActive: (isActive: boolean) => any;
  };
  notification: {
    isActive: boolean;
    setIsActive: (isActive: boolean) => any;
  };
}
