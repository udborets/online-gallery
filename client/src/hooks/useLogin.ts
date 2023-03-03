import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import useServer from "./useServer";
import useUser from "./useUser";
import provider from "../firebase/provider";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../utils/consts";
import { IdbUser } from "../models/dbTypes";

export default function useLogin() {
  const auth = getAuth();
  const { getUserByEmail, createUser } = useServer();
  const { updateUser } = useUser();
  const { deleteUser } = useUser();
  const navigate = useNavigate();
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
        if (!currentUser) {
          console.error("no current user");
          return;
        }
        if (currentUser.email) {
          try {
            const isDbHasUser = await getUserByEmail(currentUser.email);
            if (isDbHasUser) {
<<<<<<< HEAD
              updateUser(isDbHasUser);
=======
              const fetchedDbUser = isDbHasUser as unknown as IdbUser;
              updateUser(fetchedDbUser);
              console.log(fetchedDbUser);
>>>>>>> 068c21ccb499046d21d3cc122fcfc2a22f323a64
              return;
            }
            if (!isDbHasUser) {
              const newUser = (await createUser(
                currentUser.email,
                currentUser.displayName ?? "unknown"
              )) as unknown as IdbUser;
              updateUser(newUser);
<<<<<<< HEAD
              window.location.reload();
=======
>>>>>>> 068c21ccb499046d21d3cc122fcfc2a22f323a64
              return;
            }
          } catch (err) {
            console.error(
              "Error happened while trying to get data from server:",
              err
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return { checkAndLogin, userSignIn, userSignOut };
}
