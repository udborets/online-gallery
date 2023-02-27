import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useServer from '../hooks/useServer';
import { RoutePaths } from '../utils/consts';

const UserByIdPage = () => {
  const [pageUser, setUser] = useState<any>(null);
  const { id } = useParams();
  const { getUserById } = useServer();
  const navigate = useNavigate()
  if (!id) {
    navigate(RoutePaths.NOTFOUND);
    return <></>;
  }
  useEffect(() => {
    getUserById(id).then((userData) => { setUser(userData); console.log('id') }).catch((err) => console.error(err));
  }, [id])
  return (
    <div className="users-page">
      {pageUser ? pageUser.name : "no name"}
    </div>
  )
}

export default UserByIdPage