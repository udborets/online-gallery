import { getAuth, getRedirectResult } from "firebase/auth";
import useServer from "./useServer";
import useUser from "./useUser";

export default function useLogin() {
  const auth = getAuth();
  const { getUserByEmail, createUser } = useServer();
  const { updateUser } = useUser();
  function loginUser() {
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
              console.log("db has user, update state");
              updateUser({
                userInfo: {
                  ...isDbHasUser,
                },
                token: await currentUser.getIdToken(),
                isAuth: true,
              });
            }
            if (!isDbHasUser) {
              console.log("db dont have, update state");
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
  return { loginUser };
}
