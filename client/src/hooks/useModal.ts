import { useSelector } from "react-redux";
import { IStore } from "./../models/IStore";
import { useDispatch } from "react-redux";
import { setIsActive } from "../store/slices/modalSlice";

export default function useModal() {
  const modal = useSelector((store: IStore) => store.modal);
  const dispatch = useDispatch();
  function setModalIsActive(isActive: boolean) {
    dispatch(setIsActive({ isActive: isActive }));
  }
  return { modal, setModalIsActive };
}
