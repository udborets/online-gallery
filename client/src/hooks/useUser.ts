import { useSelector, useDispatch } from "react-redux";
import { deleteUserState, updateUserState } from "../store/slices/userSlice";
import { IStore } from "./../models/IStore";
import useServer from "./useServer";

export default function useUser() {
  const user = useSelector((store: IStore) => store.user);
  const { getUserById } = useServer();
  const dispatch = useDispatch();
  function deleteUser() {
    dispatch(deleteUserState());
  }
  function updateUser(userInfo: any) {
    dispatch(updateUserState({ userInfo }));
  }
  async function fetchUser(userId: string) {
    const fetchedUser = await getUserById(userId);
    updateUser(fetchedUser);
  }
  return { user, deleteUser, updateUser, fetchUser };
}
