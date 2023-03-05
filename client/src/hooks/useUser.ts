import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/slices/userSlice";
import { IStore } from "./../models/IStore";

export default function useUser() {
  const user = useSelector((store: IStore) => store.user.info);
  const dispatch = useDispatch();
  function setEmail(email: string) {
    dispatch(userActions.setUserEmail({ email: email }));
  }
  function setIsAuth(isAuth: boolean) {
    dispatch(userActions.setUserIsAuth({ isAuth: isAuth }));
  }
  function deleteInfo() {
    dispatch(userActions.deleteUserState());
  }
  return { user, setEmail, setIsAuth, deleteInfo };
}
