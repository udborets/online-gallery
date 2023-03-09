import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query/react';

import AlbumFormModal from '../components/modals/AlbumFormModal';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";
import useFirebase from '../hooks/useFirebase';
import { NotificationTypes, RoutePaths } from '../utils/consts';
import { getUserByName } from '../query';
import useNotification from './../hooks/useNotification';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const { getRefItems } = useFirebase();
  const navigate = useNavigate();
  const { user_name } = useParams();
  const { showNotification } = useNotification();
  const isOwnGallery = user_name === user.name;
  if (!user_name) {
    showNotification("Error while trying to get user name", NotificationTypes.ERROR);
    return <div>Error!</div>
  }
  const albums = useQuery({
    queryFn: async () => {
      const fetchedUser = await getUserByName(user_name);
      if (!fetchedUser) {
        showNotification("Error happened while trying to fetch user", NotificationTypes.ERROR);
        return null;
      }
      const fetchedUserAlbums = (await getRefItems(fetchedUser.email)).prefixes;
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