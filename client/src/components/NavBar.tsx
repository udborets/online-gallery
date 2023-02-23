import { NavLink } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import { getAuth, signInWithRedirect, signOut } from "firebase/auth";
import provider from '../firebase/provider';
import { useEffect } from 'react';
import useLogin from './../hooks/useLogin';


const NavBar = () => {
  const { isAuth, deleteUser, user } = useUser();
  const { loginUser } = useLogin();
  const auth = getAuth();
  useEffect(() => {
    loginUser();
  }, [])
  async function userSignIn() {
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