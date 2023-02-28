import { useState, useEffect } from 'react';
import "../styles/pages/GalleryPage.scss";
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const GalleryPage = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [albums, setAlbums] = useState<any>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentUser(user.userInfo);
    if (currentUser && currentUser.albums) {
      console.log(currentUser);
      setAlbums(currentUser.albums)
    }
  }, [currentUser]);
  return (
    <div className='gallery-page'>
      {currentUser
        &&
        <>
          {albums && albums.map((album: any) => {
            return <button key={album.id} onClick={() => navigate(`/users/${currentUser.id}/gallery/${album.id}`)}>{album.name}</button>
          })}
        </>
      }
    </div>
  )
}

export default GalleryPage