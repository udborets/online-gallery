import { useState } from 'react';
import "../styles/pages/GalleryPage.scss";
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import AlbumFormModal from '../components/modals/AlbumFormModal';
import AlbumItem from '../components/AlbumItem';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className='gallery-page'>
      {user.albums
        &&
        <>
          {user.albums && user.albums.map((album) => {
            return <AlbumItem {...album} />
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