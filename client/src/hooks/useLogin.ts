import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import provider from "../firebase/provider";
import { IdbUser } from "../models/dbTypes";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useUser from "./useUser";
import { createUser, getUser } from "../query";
import useNotification from "./useNotification";

export default function useLogin() {
  const auth = getAuth();
  const { updateUser } = useUser();
  const { deleteUser } = useUser();
  const navigate = useNavigate();
  const { showNotification, showNotificationWithTimeout } = useNotification();
  async function userSignIn() {
    signInWithRedirect(auth, provider);
  }

  async function userSignOut() {
    await signOut(auth);
    deleteUser();
    navigate(RoutePaths.HOME);
  }

  function checkAndLogin() {
    getRedirectResult(auth)
      .then(async () => {
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.email)
          try {
            const isDbHasUser = await getUser(currentUser.email);
            if (isDbHasUser) {
              const fetchedDbUser = isDbHasUser as unknown as IdbUser;
              updateUser(fetchedDbUser);
              return;
            }
            if (!isDbHasUser) {
              const newUser = await createUser(
                currentUser.email,
                currentUser.displayName ?? "unknown",
                currentUser.photoURL ?? ""
              );
              // updateUser(newUser);
              showNotificationWithTimeout(
                "Successfully signed in",
                NotificationTypes.SUCCESS,
                5000
              );
              return;
            }
          } catch (err) {
            showNotification(
              "Error happened while trying to get data from server",
              NotificationTypes.ERROR
            );
            console.error(
              "Error happened while trying to get data from server:",
              err
            );
            return;
          }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { checkAndLogin, userSignIn, userSignOut };
}
