import { useState } from "react";
import useUser from "../hooks/useUser";
import "../styles/pages/MePage.scss";
import { updateUserName, getUserByName, getUsers } from "../query";
import useNotification from "../hooks/useNotification";
import { NotificationTypes } from "../utils/consts";

const MePage = () => {
  const { user, setName } = useUser();
  const [newName, setNewName] = useState('');
  const { showNotificationWithTimeout, showNotification } = useNotification();
  return (
    <div className='me-page'>
      <button
        onClick={async () => console.log(await getUserByName(user.name))}
      >
        show user info
      </button>
      <button onClick={async () => {
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
          setName(newName);
          setNewName("");
          return;
        }
        showNotification(
          "Error happened while trying to update user name",
          NotificationTypes.ERROR,
        );
      }}
      >
        Set name
      </button>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
  )
}

export default MePage
