import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query/react';

import AlbumFormModal from '../components/modals/AlbumFormModal';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";
import useFirebase from '../hooks/useFirebase';
import { NotificationTypes, RoutePaths } from '../utils/consts';
import { getUserById, getUserByName } from '../query';
import useNotification from './../hooks/useNotification';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const { getRefItems } = useFirebase();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { showNotification } = useNotification();
  if (!user_id) {
    showNotification("Error while trying to get user name", NotificationTypes.ERROR);
    return <div className='gallery-page'>Error!</div>
  }
  const isOwnGallery = user_id === user.id;
  const albums = useQuery({
    queryFn: async () => {
      const fetchedUser = await getUserById(user_id);
      if (!fetchedUser) {
        showNotification("Error happened while trying to fetch user", NotificationTypes.ERROR);
        return null;
      }
      const fetchedUserAlbums = (await getRefItems(fetchedUser.id)).prefixes;
      return fetchedUserAlbums;
    },
  });
  if (albums.isError) {
    return <div className='gallery-page'>Error</div>
  }
  if (albums.isLoading || albums.isRefetching) {
    return <div className='gallery-page'>Loading...</div>
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
        {
          isOwnGallery &&
          <button onClick={() => setIsAlbumModalActive(oldValue => !oldValue)}>
            Add album
          </button>
        }
      </div>
      {
        isOwnGallery &&
        <ModalTemplate visible={isAlbumModalActive} setVisible={setIsAlbumModalActive} >
          <AlbumFormModal />
        </ModalTemplate>
      }
    </div>
  )
}

export default GalleryPage