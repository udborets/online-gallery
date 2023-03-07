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
  const { getRefItems, getRef, getRefUrls } = useFirebase();
  const navigate = useNavigate();
  const { data: albums, isLoading, isError } = useQuery({
    queryFn: async () => {
      const fetchedUserAlbums = (await getRefItems(getRef(user.email))).prefixes;
      const albumInfo: { albumPhotos: string[], name: string }[] = [];
      fetchedUserAlbums.forEach(async (album) => {
        const albumPhotos = await getRefUrls(album);
        albumInfo.push({
          albumPhotos,
          name: album.name,
        })
      })
      console.log(albumInfo)
      return albumInfo;
    },
    queryKey: [`${user.email}`],
  });
  if(isError) {
    return <div>Error</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className='gallery-page'>
      <div className="gallery-page__container" onClick={() => console.log(albums)}>
        {albums ? albums.map((album) => (
          <span
            key={album.name}
            onClick={() => navigate(RoutePaths.USERS + RoutePaths.ME + RoutePaths.GALLERY + '/' + album.name)}
            className="gallery__container"
          >
            qq
          </span>
        )
        ) : 'no albums'}
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