import { NotificationTypes } from "../utils/consts";

export interface IStore {
  user: {
    isAuth: boolean;
    email: string;
  };
  notification: {
    isActive: boolean;
    type: NotificationTypes;
    message: string;
  };
}
