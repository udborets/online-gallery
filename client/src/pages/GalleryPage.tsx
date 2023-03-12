import { useState } from 'react';
import { useQuery } from 'react-query/react';
import { useParams } from 'react-router-dom';

import AlbumItem from '../components/AlbumItem';
import AlbumFormModal from '../components/modals/AlbumFormModal';
import ModalTemplate from '../components/modals/templates/ModalTemplate';
import useFirebase from '../hooks/useFirebase';
import useUser from '../hooks/useUser';
import { getUserById } from '../query';
import "../styles/pages/GalleryPage.scss";
import { NotificationTypes } from '../utils/consts';
import useNotification from './../hooks/useNotification';

const GalleryPage = () => {
  const [isAlbumModalActive, setIsAlbumModalActive] = useState(false);
  const { user } = useUser();
  const { getRefItems } = useFirebase();
  const { user_id } = useParams();
  const { showNotification } = useNotification();
  if (!user_id) {
    showNotification("Error while trying to get user name", NotificationTypes.ERROR);
    return <div className='gallery-page'>Error!</div>
  }
  const isOwnPage = user_id === user.id;
  const albums = useQuery({
    queryFn: async () => {
      const fetchedUser = await getUserById(user_id);
      if (!fetchedUser) {
        showNotification("Error happened while trying to fetch user", NotificationTypes.ERROR);
        return null;
      }
      const fetchedUserAlbums = (await getRefItems(fetchedUser.id)).prefixes;
      if (!isOwnPage) {
        return fetchedUserAlbums
          .filter((fetchedAlbum) => !fetchedAlbum.name.includes('priv'));
      }
      return fetchedUserAlbums;
    },
    queryKey: [user_id],
    refetchOnWindowFocus: false,
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
        {
          albums.data && albums.data.map((album) => (
            <AlbumItem albumName={album.name} key={album.fullPath} />
          ))
        }
        {
          isOwnPage
          && <button onClick={() => setIsAlbumModalActive(oldValue => !oldValue)}>
            Add album
          </button>
        }
      </div>
      {
        isOwnPage
        && <ModalTemplate visible={isAlbumModalActive} setVisible={setIsAlbumModalActive} >
          <AlbumFormModal refetchAlbums={albums.refetch} />
        </ModalTemplate>
      }
    </div >
  )
}

export default GalleryPage