import { useSelector, useDispatch } from "react-redux";
import { deleteUserState, updateUserState } from "../store/slices/userSlice";
import IStore from "./../models/IStore";
import IUserSlice from "./../models/IUserSlice";

export default function useUser() {
  const user = useSelector((store: IStore) => store.user);
  const isAuth = user.isAuth;
  const dispatch = useDispatch();
  function deleteUser() {
    dispatch(deleteUserState());
  }
  function updateUser(userInfo: IUserSlice) {
    dispatch(updateUserState(userInfo));
  }
  return { user, deleteUser, updateUser, isAuth };
}
