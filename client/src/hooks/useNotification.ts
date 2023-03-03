import { useSelector } from "react-redux";
import { IStore } from "./../models/IStore";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/slices/notificationSlice";
import { NotificationTypes } from "../utils/consts";

export default function useNotification() {
  const notification = useSelector((store: IStore) => store.notification);
  const dispatch = useDispatch();
  function setNotificationIsActive(isActive: boolean) {
    dispatch(notificationActions.setIsActive({ isActive: isActive }));
  }
  function setNotificationMessage(message: string) {
    dispatch(notificationActions.setMessage({ message: message }));
  }
  function setNotificationType(type: NotificationTypes) {
    dispatch(notificationActions.setType({ type: type }));
  }

  function showNotification(message: string, type: NotificationTypes) {
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationIsActive(true);
    setTimeout(() => {
      setNotificationIsActive(false);
    }, 7000);
  }

  return {
    notification,
    setNotificationIsActive,
    showNotification,
    setNotificationMessage,
    setNotificationType,
  };
}
