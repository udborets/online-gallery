import { NotificationTypes } from "../utils/consts";

export interface INotificationProps {
  message: string;
  type: NotificationTypes;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}
