import { uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

import useFirebase from "../../hooks/useFirebase";
import useNotification from "../../hooks/useNotification";
import useUser from "../../hooks/useUser";
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from "../../utils/consts";

const AlbumFormModal = ({ refetchAlbums }: { refetchAlbums: () => void }) => {
  const [albumName, setAlbumName] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  const { user } = useUser();
  const { createNewFileRef, getRefItems } = useFirebase();
  const { showNotificationWithTimeout, showNotification } = useNotification();
  const nameInputRef = useRef(null);
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  })
  async function createUserAlbum() {
    if (!user.isAuth) {
      showNotification("There is no album", NotificationTypes.ERROR);
      return;
    }
    if (albumName) {
      const userAlbums = (await getRefItems(user.id)).prefixes;
      if (userAlbums.map((i) => i.name).includes(albumName)) {
        showNotificationWithTimeout("Album with this name already exists. Please, choose another one", NotificationTypes.WARNING, 6000);
        return;
      }
      if (albumName.includes('priv')) {
        showNotificationWithTimeout("Album name can not include 'priv' substring", NotificationTypes.WARNING, 6000);
        return;
      }
      const init = createNewFileRef(user.id, `${albumIsPrivate ? 'priv' : ''}` + albumName, "init");
      await uploadBytes(init, new File([''], 'init.txt'));
      setAlbumName("");
      setAlbumIsPrivate(false);
      showNotificationWithTimeout("Successfully created album", NotificationTypes.SUCCESS, 6000);
      refetchAlbums();
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
        ref={nameInputRef}
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