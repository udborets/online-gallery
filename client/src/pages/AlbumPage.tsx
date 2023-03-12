import { useState } from "react";
import { useQuery } from "react-query/react";
import { Navigate, useParams } from "react-router-dom";
import { getDownloadURL } from 'firebase/storage';

import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useFirebase from "../hooks/useFirebase";
import useNotification from "../hooks/useNotification";
import useUser from "../hooks/useUser";
import "../styles/pages/AlbumPage.scss";
import { NotificationTypes, RoutePaths } from "../utils/consts";
import ImageItem from "../components/ImageItem";

const GalleryIdPage = () => {
  const { user_id, album_name } = useParams();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  const { showNotification } = useNotification();
  const { getRefItems } = useFirebase();
  const { user } = useUser();
  const isOwnPage = user_id === user.id;
  if (!user_id || !album_name) {
    showNotification('error while reading email', NotificationTypes.ERROR);
    return <Navigate to={RoutePaths.HOME} />
  }
  if (album_name.includes("priv") && !isOwnPage) {
    return <Navigate to={RoutePaths.HOME} />
  }
  const photos = useQuery({
    queryFn: async () => {
      const fetchedPhotos = (await getRefItems(`${user_id}/${album_name}/`)).items;
      const photosList: { url: string, name: string }[] = [];
      for (let i = 0; i < fetchedPhotos.length; i++) {
        if (fetchedPhotos[i].name !== 'init' && fetchedPhotos[i].name !== 'cover') {
          const photoUrl = await getDownloadURL(fetchedPhotos[i]);
          photosList.push({ url: photoUrl, name: fetchedPhotos[i].name });
        }
      }
      return photosList;
    },
    queryKey: [`${user_id}/${album_name}`],
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  })
  if (!album_name || !user_id) {
    return <Navigate to={RoutePaths.HOME} />
  }
  if (photos.isLoading) {
    return <div className="album-page">
      <div>Photos loading...</div>
    </div>
  }
  if (photos.isError) {
    showNotification("error happened while trying to photos", NotificationTypes.ERROR);
    return <div>{JSON.stringify(photos.error)}</div>
  }
  return (
    <div className="album-page">
      <div className="album-page__container">
        <div className="album-page__photos">
          {photos.data?.length
            ? photos.data.map((photoInfo) => {
              return (
                <ImageItem {...photoInfo} />
              )
            })
            : <></>}
          {isOwnPage
            && <button
              className="add-photo"
              onClick={() => setIsPhotoModalActive(true)}>
              Add photo
            </button>}
        </div>
      </div>
      {isOwnPage
        && <ModalTemplate visible={isPhotoModalActive} setVisible={setIsPhotoModalActive} >
          <PhotoFormModal refetch={photos.refetch} />
        </ModalTemplate>}
    </div>
  )
}

export default GalleryIdPage