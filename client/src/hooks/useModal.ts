import { useSelector } from "react-redux";
import { IStore } from "./../models/IStore";
import { useDispatch } from "react-redux";
import { setModalState } from "../store/slices/modalSlice";

export default function useModal() {
  const modal = useSelector((store: IStore) => store.modal.modalElement);
  const dispatch = useDispatch();
  function setModal(newModal: JSX.Element) {
    dispatch(setModalState({ modalElement: newModal }));
  }
  return { modal, setModal };
}
