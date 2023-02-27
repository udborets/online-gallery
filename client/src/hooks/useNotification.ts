import { useSelector } from "react-redux";
import { IStore } from "./../models/IStore";
import { useDispatch } from "react-redux";
import { setNotificationState } from "../store/slices/notificationSlice";

export default function useNotification() {
  const notification = useSelector(
    (store: IStore) => store.notification.notificationElement
  );
  const dispatch = useDispatch();
  function setNotification(newNotification: JSX.Element) {
    dispatch(setNotificationState({ notificationElement: newNotification }));
  }
  return { notification, setNotification };
}
