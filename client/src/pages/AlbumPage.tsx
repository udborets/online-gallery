import { useState } from "react";
import { useQuery } from "react-query/react";
import { Navigate, useParams } from "react-router-dom";

import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useFirebase from "../hooks/useFirebase";
import useNotification from "../hooks/useNotification";
import useUser from "../hooks/useUser";
import "../styles/pages/AlbumPage.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  const { showNotification } = useNotification();
  const { getRefUrls } = useFirebase();
  const { user } = useUser();
  const isOwnPage = user_id === user.id;
  if (!user_id || !album_id) {
    showNotification('error while reading email', NotificationTypes.ERROR);
    return <Navigate to={RoutePaths.HOME}/>
  }
  if (album_id.includes("priv") && !isOwnPage) {
    return <Navigate to={RoutePaths.HOME}/>
  }
  const photos = useQuery({
    queryFn: async () => {
      const urlList = await getRefUrls(`${user_id}/${album_id}/`);
      return urlList;
    },
    queryKey: [`${user_id}/${album_id}`],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  if (!album_id || !user_id) {
    return <Navigate to={RoutePaths.HOME}/>
  }
  if (photos.isLoading) {
    return <div className="album-page">
      <div>Photos loading...</div>
    </div>
  }
  if (!photos) {
    return <div>This album has no photos</div>
  }
  if (photos.isError) {
    showNotification("error happened while trying to photos", NotificationTypes.ERROR);
    return <div>{JSON.stringify(photos.error)}</div>
  }
  return (
    <div className="album-page">
      <div className="album-page__container">
        <div className="album-page__photos">
          {photos.data
            ?
            photos.data.map((photo) => {
              return (
                <div className="photo-item" key={photo} >
                  <div className="photo-item__container">
                    <img
                      className="photo-item__image"
                      src={photo} />
                    <span className="photo-item__name"></span>
                  </div>
                </div>
              )
            })
            :
            <div>There are no photos in that album</div>
          }
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
          <PhotoFormModal refetch={photos.refetch} />
        </ModalTemplate>
      }
    </div>
  )
}

export default GalleryIdPage