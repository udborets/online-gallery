import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query/react';

import AlbumFormModal from '../components/modals/AlbumFormModal';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";
import useFirebase from '../hooks/useFirebase';
import { RoutePaths } from '../utils/consts';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const { getRefItems, getRef } = useFirebase();
  const navigate = useNavigate();
  const albums = useQuery({
    queryFn: async () => {
      const fetchedUserAlbums = (await getRefItems(getRef(user.email))).prefixes;
      return fetchedUserAlbums;
    },
  });
  if (albums.isError) {
    return <div>Error</div>
  }
  if (albums.isLoading || albums.isRefetching) {
    return <div>Loading...</div>
  }
  return (
    <div className='gallery-page'>
      <div className="gallery-page__container">
        {albums.data && albums.data.map((album) => (
          <div
            key={album.fullPath}
            onClick={() => navigate(RoutePaths.USERS + `/${user.name}` + "/gallery" + `/${album.name}`)}
          >
            {album.name}
          </div>)
        )
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