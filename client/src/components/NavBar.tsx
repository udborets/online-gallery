import { NavLink } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import useGoogleUser from './../hooks/useGoogleUser';
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import useServer from './../hooks/useServer';

const NavBar = () => {
  const { user, updateUser } = useUser();
  const { userSignOut, userSignIn } = useGoogleUser();
  const { createUser, getUserByEmail } = useServer();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email) {
        userInfo?.getIdToken().then(async (token) => {
          if (userInfo.email) {
            const userByEmail = await getUserByEmail(userInfo.email);
            if (userByEmail) {
              console.log(userByEmail)
              updateUser({
                userInfo: {
                  ...userByEmail
                },
                token: token,
                isAuth: true,
              });
              return
            }

            const newUser = await createUser(
              userInfo.email,
              userInfo.displayName ?? "Unknown",
            )
            console.log(newUser)
            updateUser({
              userInfo: {
                ...newUser
              },
              token: token,
              isAuth: true,
            });
          }
        });
      }
    }
    );
  }, [])

  return (
    <div className="nav-bar">
      <span className="nav-bar__title">
        My Gallery
      </span>
      <nav className="nav-links">
        <NavLink
          to={RoutePaths.HOME}
          className="nav-links__link"
        >
          Home
        </NavLink>
      </nav>

      <button className="nav-bar__auth"
        onClick={() => user.isAuth ? userSignOut() : userSignIn()}
      >
        {user.isAuth ? 'Log out' : "Log in"}
      </button>
      <button className="nav-bar__auth"
        onClick={() => console.log(user)}
      >
        Log
      </button>
      <button onClick={() => console.log(user.isAuth)} className="nav-bar__auth">
        is auth?
      </button>
      <span className="nav-bar__user-nickname">
        {user.userInfo.name ? user.userInfo.name : ''}
      </span>
    </div>
  )
}

export default NavBar