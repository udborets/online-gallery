import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query/react';

import useNotification from "../hooks/useNotification";
import "../styles/components/AlbumItem.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useFirebase from './../hooks/useFirebase';

const AlbumItem = ({ albumName }: { albumName: string }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user_id } = useParams();
  const { getRefUrls } = useFirebase();
  const cover = useQuery({
    queryFn: async () => {
      return (await getRefUrls(user_id + '/' + albumName))[0] ?? null;
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
        <div
          className="album__cover"
          onClick={() => navigate(RoutePaths.USERS
            + `/${user_id}`
            + RoutePaths.GALLERY
            + `/${albumName}`)}
        >
          {
            cover &&
              !!cover.data ?
              <img
                src={cover.data}
                alt="can't load image :("
                className='album__image'
              />
              :
              albumName
          }
        </div>
        <span>
          {!!cover.data && albumName}
        </span>
      </div>
    </div>
  )
}

export default AlbumItem