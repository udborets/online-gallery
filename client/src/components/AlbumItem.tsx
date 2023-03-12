import { useQuery } from 'react-query/react';
import { useNavigate, useParams } from 'react-router-dom';

import useNotification from "../hooks/useNotification";
import "../styles/components/AlbumItem.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useFirebase from './../hooks/useFirebase';
import { getDownloadURL } from 'firebase/storage';

const AlbumItem = ({ albumName }: { albumName: string }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user_id } = useParams();
  const { getRefItems } = useFirebase();
  const cover = useQuery({
    queryFn: async () => {
      const fetchedPhoto = (await getRefItems(user_id + "/" + albumName))
        .items.find((item) => item.name === 'cover') ?? null;
      if (!fetchedPhoto) return null;
      const coverURL = await getDownloadURL(fetchedPhoto);
      return coverURL;
    },
    queryKey: [albumName],
    refetchInterval: 100000000,
    refetchOnWindowFocus: false,
  });
  if (!albumName || !user_id) {
    showNotification(`error happened while fetching album`, NotificationTypes.ERROR);
    return <div className='album'>Error</div>
  }
  if (cover.isLoading) {
    return <div className='album'>
      Loading...
    </div>
  }
  return (
    <div className="album">
      <div className="album__container">
        {albumName.includes('priv') &&
          <span className='album__priv'>
            private
          </span>}
        <div
          className="album__cover"
          onClick={() => navigate(RoutePaths.USERS
            + `/${user_id}`
            + RoutePaths.GALLERY
            + `/${albumName}`)}
        >
          {cover &&
            !!cover.data ?
            (<img
              src={cover.data}
              alt="can't load image :("
              className='cover__image'
            />) :
            (<span className='cover__text'
              onClick={(e) => e.stopPropagation()}
            >
              {albumName.replace('priv_', '')}
            </span>)}
        </div>
        {!!cover.data &&
          <span className='album__name'>
            {albumName.replace('priv_', '')}
          </span>}
      </div>
    </div>
  )
}

export default AlbumItem