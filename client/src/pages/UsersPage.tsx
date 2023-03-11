import "../styles/pages/UsersPage.scss";
import { useQuery } from 'react-query';
import { getUsers } from "../query";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../utils/consts";

const UsersPage = () => {
  const { data: users } = useQuery({
    queryFn: async () => {
      return await getUsers();
    }
  });
  const navigate = useNavigate();
  return (
    <div className="users-page">
      {
        users?.map((user) => {
          return <div key={user.id} onClick={() => navigate(RoutePaths.USERS + '/' + user.id + '/gallery')}>{user.name} <img src={user.avatar} alt="user picture" /></div>
        })
      }
    </div>
  )
}

export default UsersPage