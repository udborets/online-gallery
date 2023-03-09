import { deleteObject, uploadBytes } from "firebase/storage";
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
  const { getRef, createNewFileRef, } = useFirebase();
  const { showNotificationWithTimeout, showNotification } = useNotification();

  async function createUserAlbum() {
    if (!user.isAuth) {
      showNotification("There is no album", NotificationTypes.ERROR);
      return;
    }
    if (albumName) {
      if (albumName.includes('priv')) {
        showNotificationWithTimeout("Album name can not include 'priv' substring", NotificationTypes.WARNING, 6000);
        return;
      }
      getRef(user.email + '/' + albumName + '/');
      const init = createNewFileRef('udborets@gmail.com', `${albumIsPrivate ? 'priv' : ''}` + albumName, "init");
      await uploadBytes(init, new File([''], 'init.txt'));
      setAlbumName("");
      setAlbumIsPrivate(false);
      showNotificationWithTimeout("Successfully created album", NotificationTypes.SUCCESS, 6000);
      return;
    }
    if (!albumName) {
      showNotificationWithTimeout("You have to enter album name", NotificationTypes.WARNING, 6000);
      return;
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