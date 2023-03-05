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

  async function userSignIn() {
    await signInWithRedirect(auth, provider);
    const redirectResult = await getRedirectResult(auth);
    if (redirectResult && redirectResult.user && redirectResult.user.email) {
      setEmail(redirectResult.user.email);
      setIsAuth(true);
      showNotificationWithTimeout(
        "Successfully signed in",
        NotificationTypes.SUCCESS,
        5000
      );
    }
    if (!redirectResult || !redirectResult.user.email) {
      showNotification(
        "Error while trying to get signed in user info",
        NotificationTypes.ERROR
      );
      return;
    }
  }

  async function userSignOut() {
    await signOut(auth);
    showNotificationWithTimeout(
      "Successfully signed out",
      NotificationTypes.SUCCESS,
      5000
    );
    navigate(RoutePaths.HOME);
  }

  return { userSignIn, userSignOut };
}
