import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/slices/userSlice";
import { IStore } from "./../models/IStore";

export default function useUser() {
  const user = useSelector((store: IStore) => store.user);
  const dispatch = useDispatch();
  function setEmail(email: string) {
    dispatch(userActions.setUserEmail({ email: email }));
  }
  function setIsAuth(isAuth: boolean) {
    dispatch(userActions.setUserIsAuth({ isAuth: isAuth }));
  }
  function setName(name: string) {
    dispatch(userActions.setUserName({ name: name }));
  }
  function setId(id: string) {
    dispatch(userActions.setUserId({ id: id }));
  }
  function setAvatar(avatar: string) {
    dispatch(userActions.setUserAvatar({ avatar: avatar }));
  }
  function deleteInfo() {
    dispatch(userActions.deleteUserState());
  }
  const actions = {
    setEmail,
    setIsAuth,
    deleteInfo,
    setName,
    setAvatar,
    setId,
  };
  return { actions, user };
}
