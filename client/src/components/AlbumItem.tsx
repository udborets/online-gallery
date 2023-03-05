import { useQuery } from 'react-query/react';
import { useNavigate } from 'react-router-dom';
import useFirebase from '../hooks/useFirebase';

import useNotification from "../hooks/useNotification";
import useUser from "../hooks/useUser";
import "../styles/components/AlbumItem.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";

const AlbumItem = (albumId: string) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { getAlbumFolderRef } = useFirebase()
  if (!albumId) {
    showNotification(`error happened while fetching album`, NotificationTypes.ERROR);
    return <div>Error</div>;
  }

  return (
    <div className="album">
      <div className="album__container">

        <span>
          {albumId}
        </span>

      </div>
    </div>
  )
}

export default AlbumItem