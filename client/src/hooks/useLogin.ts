import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import provider from "../firebase/provider";
import { createUser, getUserByEmail, updateUserName } from "../query";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useNotification from "./useNotification";
import useUser from "./useUser";

export default function useLogin() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { showNotification, showNotificationWithTimeout } = useNotification();
  const { setEmail, setIsAuth, setName, setAvatar } = useUser();

  async function userSignIn() {
    await signInWithRedirect(auth, provider);
  }

  async function userSignOut() {
    await signOut(auth);
    setIsAuth(false);
    setEmail("");
    showNotificationWithTimeout(
      "Successfully signed out",
      NotificationTypes.SUCCESS,
      5000
    );
    navigate(RoutePaths.HOME);
  }

  async function getUserSignIn() {
    await getRedirectResult(auth);
    const currUser = getAuth().currentUser;
    if (!currUser || !currUser.email) {
      return;
    }
    if (currUser) {
      const dbUser = await getUserByEmail(currUser.email);
      if (dbUser) {
        setEmail(dbUser.email);
        setIsAuth(true);
        setName(dbUser.name ?? "User");
        setAvatar(dbUser.avatar);
        console.log("logged in with helloing user");
      }
      if (!dbUser) {
        const createdUser = await createUser(
          currUser.email,
          currUser.displayName ?? "User",
          currUser.photoURL ?? ""
        );
        setEmail(createdUser.email);
        setIsAuth(true);
        setName(createdUser.name ?? "User");
        setAvatar(createdUser.avatar);
        showNotificationWithTimeout(
          `Welcome, ${createdUser.name}`,
          NotificationTypes.SUCCESS,
          5000
        );
        console.log("logged in with new user");
      }
    }
  }

  return { userSignIn, userSignOut, getUserSignIn };
}
