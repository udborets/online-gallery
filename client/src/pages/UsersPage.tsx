import { NavLink, useParams } from "react-router-dom"
import useServer from "../hooks/useServer";
import { useEffect, useState } from 'react';
import IUserInfo from './../models/IUserInfo';
import { RoutePaths } from "../utils/consts";
import "../styles/pages/UsersPage.scss";

const UsersPage = () => {
  const { id } = useParams();
  const { getUserById, getAllUsers } = useServer();
  if (id) {
    const [pageUser, setUser] = useState<any>(null);
    
    useEffect(() => {
      getUserById(id).then((userData) => {setUser(userData); console.log('id')});
    }, [id])
    return (
      <div className="users-page">
        {pageUser ? pageUser.name : "no name"}
      </div>
    )
  }
  else {
    const [users, setUsers] = useState<any>(null);
    useEffect(() => {
      getAllUsers().then((fetchedUsers) => setUsers(fetchedUsers));
    }, [id])
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
        <button onClick={() => console.log(users)} style={{ background: "black", color: "white" }}>
          show users from db info
        </button>
      </div>
    )
  }

}

export default UsersPage