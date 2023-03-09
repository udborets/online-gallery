import { useDispatch, useSelector } from "react-redux";

import { notificationActions } from "../store/slices/notificationSlice";
import { NotificationTypes } from "../utils/consts";
import { IStore } from "./../models/IStore";

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
  function setNotificationTimeout(timeout: NodeJS.Timeout) {
    dispatch(notificationActions.setTimeout({ timeout: timeout }));
  }

  function showNotification(message: string, type: NotificationTypes) {
    if (notification.isActive) {
      return;
    }
    clearTimeout(notification.timeout);
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationIsActive(true);
    return;
  }

  function showNotificationWithTimeout(
    message: string,
    type: NotificationTypes,
    timeout: number
  ) {
    clearTimeout(notification.timeout);
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationIsActive(true);
    setNotificationTimeout(
      setTimeout(() => {
        setNotificationIsActive(false);
      }, timeout)
    );
    return;
  }

  return {
    notification,
    setNotificationIsActive,
    showNotification,
    setNotificationMessage,
    setNotificationType,
    showNotificationWithTimeout,
  };
}
