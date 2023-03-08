import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getUserByName } from "../query";
import { RoutePaths } from '../utils/consts';

const UserByIdPage = () => {
  const navigate = useNavigate();
  const { user_name } = useParams();
  if (!user_name) {
    navigate(RoutePaths.NOTFOUND);
    return <></>;
  }
  const {
    data: fetchedUser,
    isLoading: isFetchedUserLoading,
    isError: isFetchedUserError,
    error: fetchedUserError,
  } = useQuery({
    queryFn: async () => {
      const dbUser = await getUserByName(user_name);
      console.log(dbUser);
      return dbUser
    },
    queryKey: [user_name]
  })
  if (isFetchedUserLoading) {
    return <div>Loading...</div>
  }
  if (isFetchedUserError) {
    return <div>{JSON.stringify(fetchedUserError)}</div>
  }
  return (
    <div className="users-page">
      {fetchedUser ? fetchedUser.name : 'error'}
    </div>
  )
}

export default UserByIdPage