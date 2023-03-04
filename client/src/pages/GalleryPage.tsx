import { useState } from 'react';
import "../styles/pages/GalleryPage.scss";
import useUser from '../hooks/useUser';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import AlbumFormModal from '../components/modals/AlbumFormModal';
import AlbumItem from '../components/AlbumItem';
import useNotification from '../hooks/useNotification';
import { NotificationTypes } from '../utils/consts';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { showNotification } = useNotification();
  const { user } = useUser();
  return (
    <div className='gallery-page'>
      <div className="gallery-page__container">
        {user.albums
          &&
          <>
            {user.albums && user.albums.map((album) => {
              if (!album) {
                showNotification("Can't fetch album", NotificationTypes.ERROR);
                return <div>Error</div>
              }
              return <AlbumItem key={album.id} {...album} />
            })}
          </>
        }
        <button onClick={() => setIsAlbumModalActive(oldValue => !oldValue)}>
          Add album
        </button>
      </div>
      <ModalTemplate visible={isAlbumModalActive} setVisible={setIsAlbumModalActive} >
        <AlbumFormModal />
      </ModalTemplate>
    </div>
  )
}

export default GalleryPage