import { NotificationTypes } from "../utils/consts";

export interface IStore {
  user: {
    isAuth: boolean;
    email: string;
    name: string;
    avatar: string;
  };
  notification: {
    isActive: boolean;
    type: NotificationTypes;
    message: string;
    timeout: NodeJS.Timeout;
  };
}
