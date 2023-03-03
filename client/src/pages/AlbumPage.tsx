import { useState } from "react";
import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";
import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useNotification from "../hooks/useNotification";
import useServer from "../hooks/useServer";
import "../styles/pages/AlbumPage.scss";
import { NotificationTypes } from "../utils/consts";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
  const { getAllUsers, getAllPhotosByAlbumId } = useServer();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  const { showNotification } = useNotification();
  const { data: photos, refetch: refetchPhotos, isError: isPhotosError, error: photosError, isLoading: isPhotosLoading } = useQuery({
    queryFn: async () => {
      const users = await getAllUsers();
      if (!users) {
        showNotification("error happened while trying to get users", NotificationTypes.ERROR);
        return null;
      }
      const foundUser = users.find((user) => user.id === user_id);
      if (!foundUser) {
        showNotification("there is no such user", NotificationTypes.ERROR);
        return null;
      }
      const foundUserAlbum = foundUser.albums.find(album => album.id === album_id);
      if (!foundUserAlbum) {
        showNotification("there is no such album", NotificationTypes.ERROR);
        return null;
      }
      const fetchedPhotos = await getAllPhotosByAlbumId(foundUserAlbum.id);
      if (!fetchedPhotos) {
        showNotification("error happened while trying to get album photos", NotificationTypes.ERROR);
        return null;
      }
      return fetchedPhotos;
    },
  })
  if (!album_id || !user_id) {
    showNotification("Can't get album or user id", NotificationTypes.ERROR);
    return <></>;
  }
  if (!photos) {
    return <div>this user does not have album you are trying to get</div>
  }
  if (isPhotosError) {
    showNotification("error happened while trying to photos", NotificationTypes.ERROR);
    return <div>{JSON.stringify(photosError)}</div>
  }
  if (isPhotosLoading) {
    return <div>Photos loading...</div>
  }

  return (
    <div className="album-page">
      <div className="album-page__container">
        <div className="album-page__photos">
          {Array.isArray(photos) && photos.map((photo: any) => {
            return (
              <div className="photo-item" key={photo.id} >
                <div className="photo-item__container">
                  <img
                    className="photo-item__image"
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/${photo.file}`} />
                  <span className="photo-item__name">{photo.name}</span>
                </div>
              </div>
            )
          })}
          <button onClick={() => setIsPhotoModalActive(true)}>
            Add photo
          </button>
        </div>
      </div>
      <ModalTemplate visible={isPhotoModalActive} setVisible={setIsPhotoModalActive} >
        <PhotoFormModal albumId={album_id} refetchPhotos={refetchPhotos} />
      </ModalTemplate>
    </div>
  )
}

export default GalleryIdPage