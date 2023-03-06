import { useState } from "react";
import GoogleButton from "react-google-button";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/components/NavBar.scss";
import { RoutePaths } from "../utils/consts";
import useLogin from './../hooks/useLogin';
import useUser from './../hooks/useUser';
import DropDownItem from "./UI/DropDownItem";

const NavBar = () => {
  const { userSignIn, userSignOut } = useLogin();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isShowingUserMenu, setIsShowingUserMenu] = useState(false);
  const dropDownOptions = [
    {
      key: Date.now() * Math.random(),
      fn: () => navigate(RoutePaths.ME),
      text: "My account",
      className: ""
    },
    {
      key: Date.now() * Math.random(),
      fn: () => navigate(RoutePaths.ME_GALLERY),
      text: "My gallery",
      className: ""
    },
    {
      key: Date.now() * Math.random(),
      fn: () => userSignOut(),
      text: "Sign out",
      className: "nav-profile__sign-out"
    },
  ];

  return (
    <>
      <div className="nav-bar">
        <NavLink
          to={RoutePaths.HOME}
          className="nav-bar__title">
          My Gallery
        </NavLink>
        <nav className="nav-links">
          {
            user.isAuth
              ?
              <>
                <NavLink to={RoutePaths.HOME} className="nav-links__link">
                  Home
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
      </div>
      {
        user.isAuth
          ?
          <>
            <button
              onClick={() => setIsShowingUserMenu(oldValue => !oldValue)}
              className="nav-profile__username nav-profile__option"
            >
              {user.name ?? ""}
              <img src={user.avatar} alt="" />
            </button>
            <ul className={`nav-profile ${isShowingUserMenu ? "visible" : "hidden"}`}>
              {
                dropDownOptions.map(({ text, fn, key, className }) => (
                  <DropDownItem text={text} fn={fn} key={key} className={className} />
                ))
              }
            </ul>
          </>
          :
          <GoogleButton onClick={() => userSignIn()} className="nav-profile__username" />
      }
    </>
  )
}

export default NavBar