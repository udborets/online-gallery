import { useParams } from "react-router-dom"
import useServer from "../hooks/useServer";
import { useState } from 'react';

const UsersPage = () => {
  const { id } = useParams();
  const { getUserById } = useServer();
  const [user, setUser] = useState<any>(null);
  if (id) {
    getUserById(id).then((userData) => setUser(userData));
  }
  return (
    id
      ?
      <div>
        {user ? user.name : "no name"}
      </div>
      :
      <div>
        users
      </div>
  )
}

export default UsersPage