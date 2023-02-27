import { NavLink } from "react-router-dom"
import useServer from "../hooks/useServer";
import { useEffect, useState } from 'react';
import IUserInfo from './../models/IUserInfo';
import { RoutePaths } from "../utils/consts";
import "../styles/pages/UsersPage.scss";

const UsersPage = () => {
  const { getAllUsers } = useServer();
  const [users, setUsers] = useState<any>(null);
  useEffect(() => {
    getAllUsers().then((fetchedUsers) => setUsers(fetchedUsers));
  }, [])
  return (
    <div className="users-page">
      {Array.isArray(users) ? users.map((user: IUserInfo) => (
        <div key={user.id}>
          id: {user.id} <br />
          name: {user.name} <br />
          email: {user.email} <br />
          go to {user.name} user: <NavLink to={RoutePaths.USERS + "/" + user.id}>{RoutePaths.USERS + "/" + user.id}</NavLink><br />
          go to {user.name} gallery: <NavLink to={RoutePaths.USERS + "/" + user.id + RoutePaths.GALLERY}>
            {RoutePaths.USERS + "/" + user.id + RoutePaths.GALLERY}
          </NavLink> <br />
          <br />
        </div>
      )) : "no name"}
      <button onClick={() => console.log(users)}>
        show users from db info
      </button>
    </div>
  )
}

export default UsersPage