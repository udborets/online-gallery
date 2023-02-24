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
          return;
        }
        if (currentUser.email) {
          try {
            const isDbHasUser = await getUserByEmail(currentUser.email);
            if (isDbHasUser) {
              updateUser({
                userInfo: {
                  ...isDbHasUser,
                },
                token: await currentUser.getIdToken(),
                isAuth: true,
              });
            }
            if (!isDbHasUser) {
              await createUser(
                currentUser.email,
                currentUser.displayName ?? "unknown"
              );
              updateUser({
                userInfo: {
                  email: currentUser.email,
                  name: currentUser.displayName ?? "unknown",
                },
                token: await auth.currentUser.getIdToken(),
                isAuth: true,
              });
            }
            navigate(RoutePaths.HOME);
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
