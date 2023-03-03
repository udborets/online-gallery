import { useSelector, useDispatch } from "react-redux";
import { IdbUser } from "../models/dbTypes";
import { userActions } from "../store/slices/userSlice";
import { IStore } from "./../models/IStore";
import useServer from "./useServer";

export default function useUser() {
  const user = useSelector((store: IStore) => store.userState.userInfo);
  const { getUserById } = useServer();
  const dispatch = useDispatch();

  function deleteUser() {
    dispatch(userActions.deleteUserState());
  }

  function updateUser(userInfo: IdbUser) {
    dispatch(userActions.updateUserState({ userInfo }));
  }

  async function fetchUser(userId: string) {
    const fetchedUser = (await getUserById(userId)) as unknown as IdbUser;
    updateUser(fetchedUser);
  }

  return { user, deleteUser, updateUser, fetchUser };
}
