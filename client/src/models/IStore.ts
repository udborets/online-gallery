import { IUserSlice } from "./IUserSlice";

export interface IStore {
  user: IUserSlice;
  modal: {
    modalElement: JSX.Element;
  };
  notification: {
    notificationElement: JSX.Element;
  };
}
