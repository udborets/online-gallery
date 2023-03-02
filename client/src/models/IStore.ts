import { IdbUser } from "./dbTypes";

export interface IStore {
  userState: {
    userInfo: IdbUser;
  };
  notification: {
    isActive: boolean;
    setIsActive: (isActive: boolean) => any;
  };
}
