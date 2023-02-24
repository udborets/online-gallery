import { NavLink } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import useLogin from './../hooks/useLogin';
import GoogleButton from "react-google-button";
import { useState } from "react";


const NavBar = () => {
  const { userSignIn, userSignOut } = useLogin();
  const { user, isAuth } = useUser();
  const [isShowingUserMenu, setIsShowingUserMenu] = useState(false);
  return (
    <div className="nav-bar">
      <NavLink
        to={RoutePaths.HOME}
        className="nav-bar__title">
        My Gallery
      </NavLink>

      <nav className="nav-links">
        {
          isAuth
            ?
            <>
              <NavLink to={RoutePaths.HOME} className="nav-links__link">
                Home
              </NavLink>
              <NavLink to={RoutePaths.ME} className="nav-links__link">
                My account
              </NavLink>
              <NavLink to={RoutePaths.USERS} className="nav-links__link">
                Users
              </NavLink>
            </>
            :
            <>
              <NavLink to={RoutePaths.HOME} className="nav-links__link">
                Home
              </NavLink>
            </>

        }
      </nav>
      <div className="nav-profile">
        {
          isAuth
            ?
            <>
              <span
                className="nav-profile__username"
              >
                {isAuth ? user.userInfo.name : ""}
              </span>
              {
                isShowingUserMenu
                &&
                <>
                  <button
                    className="nav-profile__button"
                    onClick={() => userSignOut()}
                  >
                    Sign out
                  </button>
                </>
              }
            </>
            :
            <GoogleButton onClick={() => userSignIn()} />
        }

      </div>
    </div>
  )
}

export default NavBar