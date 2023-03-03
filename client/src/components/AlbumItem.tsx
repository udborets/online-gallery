import { IdbAlbum } from "../models/dbTypes";
import { useNavigate } from 'react-router-dom';
import { NotificationTypes, RoutePaths } from "../utils/consts";
import useUser from "../hooks/useUser";
import useServer from "../hooks/useServer";
import { useQuery } from 'react-query/react';
import useNotification from "../hooks/useNotification";
import "../styles/components/AlbumItem.scss";

const AlbumItem = (album: IdbAlbum) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { getAllPhotosByAlbumId } = useServer();
  const { showNotification } = useNotification();
  const { data: albumCoverFile } = useQuery({
    queryFn: async () => {
      const albumPhotos = await getAllPhotosByAlbumId(album.id);
      if (!albumPhotos) {
        showNotification(`error happened while fetching ${album.name} album`, NotificationTypes.ERROR);
        return null;
      }
      if (albumPhotos[0]) {
        return albumPhotos[0].file;
      }
      return null;
    },
    onError: () => {
      showNotification("Can't load image", NotificationTypes.ERROR)
    },
    queryKey: [`album${album.id}`],
    refetchInterval: 99999,
    enabled: true,
  })
  return (
    <div className="album"
      onClick={() => navigate(RoutePaths.USERS + "/" + user.id + RoutePaths.GALLERY + `/${album.id}`)}>
      <div className="album__container">
        {
          albumCoverFile &&
          <img
            className="album__cover"
            src={import.meta.env.VITE_REACT_APP_API_URL + "/" + albumCoverFile}
            alt="cant load image"
          />
        }
        {album.name}
      </div>
    </div>
  )
}

export default AlbumItem