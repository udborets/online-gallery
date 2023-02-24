import useServer from './../hooks/useServer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";

const GalleryPage = () => {
  const { id } = useParams()
  const { getUserById, createAlbum } = useServer();
  const [pageUser, setPageUser] = useState<any>()
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [notification, setNotification] = useState("");
  const { user } = useUser();
  const [error, setError] = useState("");
  const [albumIsPrivate, setAlbumIsPrivate] = useState(false);
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
  useEffect(() => {
    if (id) {
      getUserById(id).then(fetchedUser => setPageUser(fetchedUser))
    }
    else {
      setPageUser(user.userInfo);
    }
    console.log(pageUser)
  }, [id])

  return (
    <div className='gallery-page'>
      {pageUser
        &&
        (
          <>
            {pageUser.name} gallery
            {pageUser.albums
              &&
              Array.isArray(pageUser.albums) &&
              pageUser.albums.map((album: any) => (
                <div key={album.id} className="album-info">
                  <span>
                    Album name: {album.name}
                  </span>
                  <p>
                    Album description: {album.description}
                  </p>
                </div>
              )
              )}
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
            <span>Is private?</span> <input type="checkbox" onClick={() => setAlbumIsPrivate(state => !state)} />

            {
              error
              &&
              <span >
                {error}
              </span>
            }
            {
              notification
              &&
              <span>
                {notification}
              </span>
            }
            <button onClick={async () => await createUserAlbum()}>
              create album
            </button>
          </>
        )
      }

    </div>
  )
}

export default GalleryPage