import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import provider from "../firebase/provider";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useNotification from "./useNotification";
import useUser from "./useUser";

export default function useLogin() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { showNotification, showNotificationWithTimeout } = useNotification();
  const { setEmail, setIsAuth } = useUser();

  function getUser() {
    return getAuth().currentUser;
  }

  async function userSignIn() {
    await signInWithRedirect(auth, provider);
  }

  async function userSignOut() {
    await signOut(auth);
    setIsAuth(false);
    setEmail('');
    showNotificationWithTimeout(
      "Successfully signed out",
      NotificationTypes.SUCCESS,
      5000
    );
    navigate(RoutePaths.HOME);
  }

  async function getUserSignIn() {
    await getRedirectResult(auth);
    const currUser = getUser();
    if (!currUser || !currUser.email) {
      showNotification(
        "Error while trying to get signed in user info",
        NotificationTypes.ERROR
      );
      return;
    }
    if (currUser) {
      setEmail(currUser.email);
      setIsAuth(true);
      showNotificationWithTimeout(
        "Successfully signed in",
        NotificationTypes.SUCCESS,
        5000
      );
    }
  }

  return { userSignIn, userSignOut, getUserSignIn };
}
