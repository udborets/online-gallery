import { useState } from 'react';
import "../styles/pages/GalleryPage.scss";
import useUser from '../hooks/useUser';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import AlbumFormModal from '../components/modals/AlbumFormModal';
import AlbumItem from '../components/AlbumItem';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  return (
    <div className='gallery-page'>
      <div className="gallery-page__container">
        <div className="gallery-page__albums">
          {user.albums
            &&
            <>
              {user.albums && user.albums.map((album) => {
                return <AlbumItem key={album.id} {...album} />
              })}
            </>
          }
          <button onClick={() => setIsAlbumModalActive(oldValue => !oldValue)}>
            Add album
          </button>
        </div>
      </div>
      <ModalTemplate visible={isAlbumModalActive} setVisible={setIsAlbumModalActive} >
        <AlbumFormModal />
      </ModalTemplate>
    </div>
  )
}

export default GalleryPage