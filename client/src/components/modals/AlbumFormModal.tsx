import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import useServer from "../../hooks/useServer";
import useUser from "../../hooks/useUser";
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from "../../utils/consts";

const AlbumFormModal = () => {
  const { createAlbum } = useServer();
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  const { user, fetchUser } = useUser();
  const { showNotificationWithTimeout, showNotification } = useNotification();

  async function createUserAlbum() {
    if (!user.id) {
      showNotification("There is no album", NotificationTypes.ERROR);
      return;
    }
    if (albumName) {
      await createAlbum(
        user.id,
        albumName,
        albumDescription,
        albumIsPrivate,
      );
      await fetchUser(user.id);
      setAlbumName("");
      setAlbumDescription("");
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
      <textarea
        onChange={e => setAlbumDescription(e.target.value)}
        className="album-form__description"
        placeholder='Enter album description'
        value={albumDescription}
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