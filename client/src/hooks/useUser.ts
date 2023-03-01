import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";
import { IStore } from "./../models/IStore";
import useServer from "./useServer";

export default function useUser() {
  const user = useSelector((store: IStore) => store.user);
  const { getUserById } = useServer();
  const dispatch = useDispatch();
  function deleteUser() {
    dispatch(userActions.deleteUserState());
  }
  function updateUser(userInfo: any) {
    dispatch(userActions.updateUserState({ userInfo }));
  }
  async function fetchUser(userId: string) {
    const fetchedUser = await getUserById(userId);
    updateUser(fetchedUser);
  }
  return { user, deleteUser, updateUser, fetchUser };
}
