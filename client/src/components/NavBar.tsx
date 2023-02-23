import { NavLink } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import { getAuth, getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";
import provider from './../auth/provider';
import useServer from "../hooks/useServer";
import { useEffect } from 'react';


const NavBar = () => {
  const { isAuth, updateUser, deleteUser, user } = useUser();
  const { getUserByEmail, createUser } = useServer();
  const auth = getAuth();
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        console.log('helloing', result);
        const currentUser = auth.currentUser;
        if (!currentUser) {
          return;
        }
        if (currentUser.email) {
          const isDbHasUser = await getUserByEmail(currentUser.email);
          if (isDbHasUser) {
            console.log('db has user, update state')
            updateUser({
              userInfo: {
                ...isDbHasUser,
              },
              token: await currentUser.getIdToken(),
              isAuth: true,
            })
          }
          if (!isDbHasUser) {
            console.log('db dont have, update state')
            await createUser(currentUser.email, currentUser.displayName ?? "unknown")
            updateUser({
              userInfo: {
                email: currentUser.email,
                name: currentUser.displayName ?? "unknown",
              },
              token: await auth.currentUser.getIdToken(),
              isAuth: true,
            })
          }
        }
      }).catch((error) => {
        console.log(error)
      });
  }, [])
  async function userSignIn() {
    console.log('hellong')
    signInWithRedirect(auth, provider);

  }
  async function userSignOut() {
    await signOut(auth);
    deleteUser();
  }
  const showInfo = () => {
    console.log(user);
  }
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
      <button
        onClick={showInfo}
      >
        show info
      </button>
      <button
        className="nav-bar__link"
        onClick={() => isAuth ? userSignOut() : userSignIn()}
      >
        {isAuth ? "Sign out" : "Sign in"}
      </button>
      <span>
        {isAuth ? user.userInfo.name : ""}
      </span>
    </div>
  )
}

export default NavBar