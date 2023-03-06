import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getUser } from "../query";
import { RoutePaths } from '../utils/consts';

const UserByIdPage = () => {
  const navigate = useNavigate();
  const { user_email } = useParams();
  if (!user_email) {
    navigate(RoutePaths.NOTFOUND);
    return <></>;
  }
  const {
    data: fetchedUser,
    isLoading: isFetchedUserLoading,
    isError: isFetchedUserError,
    error: fetchedUserError,
  } = useQuery({
    queryFn: () => getUser(user_email),
    queryKey: [user_email]
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