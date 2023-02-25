import useServer from './../hooks/useServer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../styles/pages/GalleryPage.scss";
import AlbumForm from './../components/AlbumForm';
import useUser from '../hooks/useUser';

const GalleryPage = () => {
  const { getUserById, getAllPhotosByAlbumId } = useServer();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [photos, setPhotos] = useState<any>(null);
  const { user } = useUser();
  useEffect(() => {
    setCurrentUser(user.userInfo);
    if (currentUser && currentUser.albums) {
      getAllPhotosByAlbumId(currentUser.albums[0].id).then((fetchedAlbum) => {
        if (fetchedAlbum) {
          setPhotos(fetchedAlbum);
        }
      });
    }
  }, [currentUser])
  return (
    <div className='gallery-page'>
      {currentUser
        &&
        <>
          <AlbumForm {...currentUser} />
          {photos && photos.map((photo: any) => {
            return <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${photo.file}`} key={photo.id} />
          })}
        </>
      }
    </div>
  )
}

export default GalleryPage