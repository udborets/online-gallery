import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";

import { getUsers } from "../query";
import "../styles/pages/UsersPage.scss";
import { RoutePaths } from "../utils/consts";

const UsersPage = () => {
  const users = useQuery({
    queryFn: async () => {
      return await getUsers();
    }
  });
  const navigate = useNavigate();
  return (
    <div className="users-page">
      {
        users.data && 
        users.data.map((user) => {
          return (
            <div
              key={user.id}
              onClick={() => navigate(RoutePaths.USERS
                + '/'
                + user.id
                + '/gallery')}
            >
              {user.name}
              <img
                src={user.avatar}
                alt="user picture"
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersPage