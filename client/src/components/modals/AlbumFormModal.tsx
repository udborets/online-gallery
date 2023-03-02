import { useState } from "react";
import useServer from "../../hooks/useServer";
import useUser from "../../hooks/useUser";
import "../../styles/components/modals/PhotoFormModal.scss";

const AlbumFormModal = () => {
  const { createAlbum } = useServer();
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  const { user, fetchUser } = useUser();

  async function createUserAlbum() {
    if (!user.userInfo.user.id) {
      setTimeout(() => {
      }, 3000);
      console.log(1212)
      return
    }
    if (albumName) {
      await createAlbum(
        user.userInfo.user.id,
        albumName,
        albumDescription,
        albumIsPrivate,
      );
      await fetchUser(user.userInfo.user.id);
      setAlbumName("");
      setAlbumDescription("");
      setTimeout(() => {
      }, 3000);
      return;
    }
    setTimeout(() => {
    }, 5000);
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
      <span>Is private?</span>
      <input
        type="checkbox"
        onClick={() => setAlbumIsPrivate(state => !state)}
      />
      <button onClick={async () => {
        await createUserAlbum();
      }}>
        Create album
      </button>
    </div>
  )
}

export default AlbumFormModal