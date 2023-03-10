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
      fn: () => navigate(RoutePaths.USERS + `/${user.id}`),
      text: "My account",
      className: "",
    },
    {
      key: Date.now() * Math.random(),
      fn: () => navigate(RoutePaths.USERS + `/${user.id}` + RoutePaths.GALLERY),
      text: "My gallery",
      className: "",
    },
    {
      key: Date.now() * Math.random(),
      fn: () => userSignOut(),
      text: "Sign out",
      className: "nav-profile__sign-out",
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
          <div className="nav-profile__wrapper">
            <button
              onClick={() => setIsShowingUserMenu(oldValue => !oldValue)}
              className="nav-profile__username nav-profile__option"
            >
              {user.name ?? ""}
              <img className="nav-profile__avatar" src={user.avatar} alt="" />
            </button>
            <ul className={`nav-profile__dropdown ${isShowingUserMenu ? "visible" : "hidden"}`}>
              {
                dropDownOptions.map(({ text, fn, key, className }) => (
                  <DropDownItem text={text} fn={fn} key={key} className={className} />
                ))
              }
            </ul>
          </div>
          :
          <GoogleButton onClick={() => userSignIn()} className="sign-in-button" />
      }
    </>
  )
}

export default NavBar