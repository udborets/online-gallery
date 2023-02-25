import { useState } from "react";
import useServer from "../hooks/useServer";
import IUserInfo from './../models/IUserInfo';


const AlbumForm = (user: IUserInfo) => {
  const { createAlbum } = useServer();
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  async function createUserAlbum() {
    if (!user.id) {
      return
    }
    if (albumName) {
      await createAlbum(
        user.id,
        albumName,
        albumDescription,
        albumIsPrivate,
      );
      setAlbumName("");
      setAlbumDescription("");
      setNotification(`Successfully created album "${albumName}"!`);
      setTimeout(() => {
        setNotification("");
      }, 3000);
      return;
    }
    setError("Enter album name to create it.");
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div className="album-form">
      <>
        <input
          type="text"
          onChange={e => setAlbumName(e.target.value)}
          className="album-form__input"
          placeholder='Enter album name'
          value={albumName}
        />
        <textarea
          onChange={e => setAlbumDescription(e.target.value)}
          className="album-form__input"
          placeholder='Enter album description'
          value={albumDescription}
        />
        <span>Is private?</span>
        <input
          type="checkbox"
          onClick={() => setAlbumIsPrivate(state => !state)}
        />
        {
          error
          &&
          <div>
            {error}
          </div>
        }
        {
          notification
          &&
          <div>
            {notification}
          </div>
        }
        <button onClick={async () => {
          await createUserAlbum();
        }}>
          Create album
        </button>
      </>
    </div>
  )
}

export default AlbumForm