import { useNavigate, useParams } from 'react-router-dom';

import useNotification from "../hooks/useNotification";
import "../styles/components/AlbumItem.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";

const AlbumItem = (albumId: string) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { user_name } = useParams()
  if (!albumId || !user_name) {
    showNotification(`error happened while fetching album`, NotificationTypes.ERROR);
    return <div>Error</div>
  }
  return (
    <div className="album">
      <div className="album__container">
        <span onClick={() => navigate(RoutePaths.USERS + `/${user_name}` + RoutePaths.GALLERY + `/${albumId}`)}>
          {albumId}
        </span>
      </div>
    </div>
  )
}

export default AlbumItem