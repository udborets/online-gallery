import { NavLink, useNavigate } from "react-router-dom"
import { RoutePaths } from "../utils/consts"
import "../styles/components/NavBar.scss";
import useUser from './../hooks/useUser';
import useLogin from './../hooks/useLogin';
import GoogleButton from "react-google-button";
import { useState } from "react";
import DropDownItem from "./UI/DropDownItem";


const NavBar = () => {
  const { userSignIn, userSignOut } = useLogin();
  const { user, isAuth } = useUser();
  const navigate = useNavigate();
  const [isShowingUserMenu, setIsShowingUserMenu] = useState(false);
  const dropDownOptions = [
    {
      key: Date.now() * Math.random(),
      fn: () => setIsShowingUserMenu(oldValue => !oldValue),
      text: user.userInfo.name ?? "",
      className: isShowingUserMenu ? "nav-profile__username nav-profile__username-active" : "nav-profile__username"
    },
    {
      key: Date.now() * Math.random(),
      fn: () => navigate(RoutePaths.ME),
      text: "My account",
      className: ""
    },
    {
      key: Date.now() * Math.random(),
      fn: () => navigate(RoutePaths.GALLERY),
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
      {
        isAuth
          ?
          <ul className="nav-profile">
            <>
              {
                isShowingUserMenu
                  ?
                  dropDownOptions.map(({ text, fn, key, className }) => (
                    <DropDownItem text={text} fn={fn} key={key} className={className} />
                  ))
                  :
                  <DropDownItem {...dropDownOptions[0]} />
              }
            </>
          </ul>
          :
          <GoogleButton onClick={() => userSignIn()} />
      }
    </div>
  )
}

export default NavBar
{/* <span
className="nav-profile__username"
onClick={() => setIsShowingUserMenu(oldValue => !oldValue)}
>
{isAuth ? user.userInfo.name : ""}
</span>
{

} */}

{/* <button
className="nav-profile__button"
onClick={() => userSignOut()}
>
Sign out
</button> */}