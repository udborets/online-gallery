import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useNotification from '../hooks/useNotification';
import useUser from '../hooks/useUser';

import { getUserByName, getUsers, updateUserName } from "../query";
import { NotificationTypes, RoutePaths } from '../utils/consts';

const UserByIdPage = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { user, actions: userActions } = useUser();
  const [newName, setNewName] = useState('');
  const { showNotificationWithTimeout, showNotification } = useNotification();
  const changeName = async () => {
    const allUserNames = (await getUsers()).map((fetchedUser) => fetchedUser.name);
    if (allUserNames.find((fetchedUserName) => fetchedUserName === newName)?.length) {
      showNotificationWithTimeout(
        "User with this user name already exists, please, choose another one",
        NotificationTypes.WARNING,
        5000,
      );
      return;
    }
    const userWithUpdatedName = await updateUserName(user.name, newName);
    if (userWithUpdatedName.name === newName) {
      showNotificationWithTimeout(
        "Successfully updated name",
        NotificationTypes.SUCCESS,
        5000
      );
      userActions.setName(newName);
      setNewName("");
      return;
    }
    showNotification(
      "Error happened while trying to update user name",
      NotificationTypes.ERROR,
    );
  }
  if (!user_id) {
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
      const dbUser = await getUserByName(user_id);
      console.log(dbUser);
      return dbUser
    },
    queryKey: [user_id]
  })
  if (isFetchedUserLoading) {
    return <div>Loading...</div>
  }
  if (isFetchedUserError) {
    return <div>{JSON.stringify(fetchedUserError)}</div>
  }
  return (
    <div className="users-page">
      <button
        onClick={async () => console.log(await getUserByName(user.name))}
      >
        show user info
      </button>
      <button onClick={changeName}
      >
        Set name
      </button>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
  )
}

export default UserByIdPage