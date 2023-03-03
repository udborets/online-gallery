import { NotificationTypes } from "../utils/consts";
import { IdbUser } from "./dbTypes";

export interface IStore {
  userState: {
    userInfo: IdbUser;
  };
  notification: {
    isActive: boolean;
    type: NotificationTypes;
    message: string;
  };
}
