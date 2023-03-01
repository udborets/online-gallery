import { useState } from 'react';
import "../styles/pages/GalleryPage.scss";
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import AlbumFormModal from '../components/modals/AlbumFormModal';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className='gallery-page'>
      {user.userInfo.albums
        &&
        <>
          {user.userInfo.albums && user.userInfo.albums.map((album: any) => {
            return <button key={album.id} onClick={() => navigate(`/users/${album.authorId}/gallery/${album.id}`)}>{album.name}</button>
          })}
        </>
      }
      <button onClick={() => setIsAlbumModalActive(oldValue => !oldValue)}>
        Add album
      </button>
      <ModalTemplate visible={isAlbumModalActive} setVisible={setIsAlbumModalActive} >
        <AlbumFormModal />
      </ModalTemplate>
    </div>
  )
}

export default GalleryPage