import { getAuth, onAuthStateChanged } from "firebase/auth";
import useServer from "./useServer";
import useUser from "./useUser";

export default function useLogin() {
  const auth = getAuth();
  const { updateUser } = useUser();
  const { createUser, getUserByEmail } = useServer();
  function checkLogin() {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email) {
        userInfo?.getIdToken().then(async (token) => {
          if (userInfo.email) {
            const userByEmail = await getUserByEmail(userInfo.email);
            if (userByEmail) {
              console.log(userByEmail);
              updateUser({
                userInfo: {
                  ...userByEmail,
                },
                token: token,
                isAuth: true,
              });
              return;
            }
            const newUser = await createUser(
              userInfo.email,
              userInfo.displayName ?? "Unknown"
            );
            console.log(newUser);
            updateUser({
              userInfo: {
                ...newUser,
              },
              token: token,
              isAuth: true,
            });
          }
        });
      }
    });
  }
  return { checkLogin };
}
