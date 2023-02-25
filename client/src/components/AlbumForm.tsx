import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import IUserInfo from './../models/IUserInfo';

const AlbumForm = ({ id }: IUserInfo) => {
  const { getUserById, createAlbum } = useServer();
  const [pageUser, setPageUser] = useState<any>()
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
  useEffect(() => {
    if (!id) {
      setError("there is no user id")
    }
    if (id) {
      getUserById(id)
        .then((fetchedUser) =>
          setPageUser(fetchedUser)
        )
    }
  }, [])
  async function createUserAlbum() {
    if (albumName) {
      await createAlbum(
        pageUser.id,
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
        {pageUser.name} gallery
        {pageUser}
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