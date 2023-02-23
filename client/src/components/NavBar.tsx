import { NavLink } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import useGoogleUser from './../hooks/useGoogleUser';
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const NavBar = () => {
  const { user, updateUser } = useUser();
  const { userSignOut, userSignIn } = useGoogleUser();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userInfo) => {
      userInfo?.getIdToken().then((token) => {
        console.log(userInfo)
        updateUser({
          userInfo: {
            name: userInfo?.displayName,
            email: userInfo?.email,
          },
          token: token,
          isAuth: true,
        });
      });
    });
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