import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
import provider from "../auth/provider";
import useUser from "./useUser";

export default function useGoogleUser() {
  const { deleteUser } = useUser();
  function userSignOut() {
    const auth = getAuth();
    console.log("sign out worked");
    signOut(auth)
      .then((signOutInfo) => {
        console.log("signed out, ok");
      })
      .catch((error) => {
        console.log(error);
      });
    deleteUser();
  }

  function userSignIn() {
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  }

  function userIsAuth() {
    const googleAuth = getAuth();
    const googleUser = googleAuth.currentUser;
    if (googleUser) {
      return true;
    }
    return false;
  }
  return { userIsAuth, userSignIn, userSignOut };
}
