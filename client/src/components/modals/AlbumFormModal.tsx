import { useState } from "react";
import useFirebase from "../../hooks/useFirebase";

import useNotification from "../../hooks/useNotification";
import useUser from "../../hooks/useUser";
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from "../../utils/consts";

const AlbumFormModal = () => {
  const [albumName, setAlbumName] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  const { user } = useUser();
  const { getRef } = useFirebase();
  const { showNotificationWithTimeout, showNotification } = useNotification();

  async function createUserAlbum() {
    if (!user.isAuth) {
      showNotification("There is no album", NotificationTypes.ERROR);
      return;
    }
    if (albumName) {
      getRef(user.email + '/' + albumName + '/');
      setAlbumName("");
      showNotificationWithTimeout("Successfully created album", NotificationTypes.SUCCESS, 6000);
      return;
    }
    if (!albumName) {
      showNotificationWithTimeout("You have to enter album name", NotificationTypes.WARNING, 6000);
    }
  }

  return (
    <div className="modal-form"
      onClick={e => e.stopPropagation()}
    >
      <input
        type="text"
        onChange={e => setAlbumName(e.target.value)}
        className="album-form__input"
        placeholder='Enter album name'
        value={albumName}
      />
      <div>
        <span>Is private?</span>
        <input
          type="checkbox"
          onClick={() => setAlbumIsPrivate(state => !state)}
        />
      </div>
      <button onClick={async () => {
        await createUserAlbum();
      }}>
        Create album
      </button>
    </div>
  )
}

export default AlbumFormModal