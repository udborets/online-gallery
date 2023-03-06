import { useState } from 'react';

import AlbumFormModal from '../components/modals/AlbumFormModal';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  return (
    <div className='gallery-page'>
      <div className="gallery-page__container">
        {user
          &&
          <>
            {user.email}
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