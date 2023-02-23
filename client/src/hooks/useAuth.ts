import { useSelector } from "react-redux";
import IStore from "./../models/IStore";

export default function useAuth() {
  const user = useSelector((store: IStore) => store.user);
  return user.isAuth;
}
