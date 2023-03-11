import { uuidv4 } from "@firebase/util";
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut
} from "firebase/auth";
import { uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import provider from "../firebase/provider";
import { createUser, getUserByEmail } from "../query";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useFirebase from "./useFirebase";
import useNotification from "./useNotification";
import useUser from "./useUser";

export default function useLogin() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { showNotificationWithTimeout } = useNotification();
  const { actions: userActions } = useUser();
  const { getRef } = useFirebase();

  async function userSignIn() {
    await signInWithRedirect(auth, provider);
  }

  async function userSignOut() {
    await signOut(auth);
    userActions.setName("");
    userActions.setIsAuth(false);
    userActions.setEmail("");
    userActions.setId("");
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
        userActions.setId(dbUser.id);
        userActions.setEmail(dbUser.email);
        userActions.setIsAuth(true);
        userActions.setName(dbUser.name ?? "User");
        userActions.setAvatar(dbUser.avatar ?? "");
      }
      if (!dbUser) {
        const createdUser = await createUser(
          currUser.email,
          currUser.displayName ?? `User${uuidv4()}`,
          currUser.photoURL ?? ""
        );
        userActions.setEmail(createdUser.email);
        userActions.setId(createdUser.id);
        userActions.setIsAuth(true);
        userActions.setName(createdUser.name ?? "User");
        userActions.setAvatar(createdUser.avatar ?? "");
        showNotificationWithTimeout(
          `Welcome, ${createdUser.name}`,
          NotificationTypes.SUCCESS,
          5000
        );
        uploadBytes(
          getRef(`${createdUser.id}/init`),
          new File([""], "init.txt")
        );
      }
    }
  }

  return { userSignIn, userSignOut, getUserSignIn };
}
