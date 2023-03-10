import { useState } from "react";
import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";

import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useFirebase from "../hooks/useFirebase";
import useNotification from "../hooks/useNotification";
import useUser from "../hooks/useUser";
import "../styles/pages/AlbumPage.scss";
import { NotificationTypes } from "../utils/consts";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  const { showNotification } = useNotification();
  const { getRefUrls } = useFirebase();
  const { user } = useUser();
  const isOwnPage = user_id === user.id;
  if (!user_id || !album_id) {
    showNotification('error while reading email', NotificationTypes.ERROR);
    return <div></div>
  }
  const {
    data: photos,
    refetch: refetchPhotos,
    isError: isPhotosError,
    error: photosError,
    isLoading: isPhotosLoading } = useQuery({
      queryFn: async () => {
        const list = await getRefUrls(`${user_id}/${album_id}/`);
        return list;
      },
      queryKey: [`${user_id}/${album_id}`],
    })
  if (!album_id || !user_id) {
    return <>werfr</>
  }
  if (isPhotosLoading) {
    return <div>Photos loading...</div>
  }
  if (!photos) {
    return <div>This album has no photos</div>
  }
  if (isPhotosError) {
    showNotification("error happened while trying to photos", NotificationTypes.ERROR);
    return <div>{JSON.stringify(photosError)}</div>
  }

  return (
    <div className="album-page">
      <div className="album-page__container">
        <div className="album-page__photos">
          {Array.isArray(photos) && photos.map((photo) => {
            return (
              <div className="photo-item" key={photo} >
                <div className="photo-item__container">
                  <img
                    className="photo-item__image"
                    src={photo} />
                  <span className="photo-item__name">Helloing</span>
                </div>
              </div>
            )
          })}
          {
            isOwnPage &&
            <button onClick={() => setIsPhotoModalActive(true)}>
              Add photo
            </button>
          }
        </div>
      </div>
      {isOwnPage &&
        <ModalTemplate visible={isPhotoModalActive} setVisible={setIsPhotoModalActive} >
          <PhotoFormModal albumId={album_id} refetchPhotos={refetchPhotos} />
        </ModalTemplate>
      }
    </div>
  )
}

export default GalleryIdPage