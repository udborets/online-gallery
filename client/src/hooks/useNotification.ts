import { useSelector } from "react-redux";
import { IStore } from "./../models/IStore";
import { useDispatch } from "react-redux";
import { setIsActive } from "../store/slices/notificationSlice";

export default function useNotification() {
  const notification = useSelector((store: IStore) => store.notification);
  const dispatch = useDispatch();
  function setNotificationIsActive(isActive: boolean) {
    dispatch(setIsActive({ isActive: isActive }));
  }
  return { notification, setNotificationIsActive };
}
