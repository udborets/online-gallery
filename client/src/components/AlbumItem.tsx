import { useNavigate, useParams } from 'react-router-dom';

import useNotification from "../hooks/useNotification";
import "../styles/components/AlbumItem.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";

const AlbumItem = (albumId: string) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user_id } = useParams();
  if (!albumId || !user_id) {
    showNotification(`error happened while fetching album`, NotificationTypes.ERROR);
    return <div>Error</div>
  }
  return (
    <div className="album">
      <div className="album__container">
        <span onClick={() => navigate(RoutePaths.USERS + `/${user_id}` + RoutePaths.GALLERY + `/${albumId}`)}>
          {albumId}
        </span>
      </div>
    </div>
  )
}

export default AlbumItem