import { useState } from "react";
import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";
import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useServer from "../hooks/useServer";
import useUser from "../hooks/useUser";
import "../styles/pages/AlbumPage.scss";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
  const { user } = useUser();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  if (!album_id || !user_id) {
    return <div>there is no album_id or user_id parameter in query</div>
  }
  const { getUserById, getAllPhotosByAlbumId } = useServer();
  const {
    data: photos,
    isError: isPhotosError,
    error: photosError,
    isLoading: isPhotosLoading,
    refetch: refetchPhotos,
  } =
    useQuery({
      queryFn: async () => {
        const fetchedUser = await getUserById(user_id);
        if (!fetchedUser) {
          return false;
        }
        const currentAlbum = fetchedUser.albums.find(album => album.id === album_id);
        if (currentAlbum) {
          return await getAllPhotosByAlbumId(currentAlbum.id);
        }
        return null;
      },
      queryKey: ["currentUser"],
      refetchInterval: 20000,
    });


  if (!photos) {
    return <div>this user does not have album you are trying to get</div>
  }
  if (isPhotosError) {
    console.error(photosError);
    return <div>{JSON.stringify(photosError)}</div>
  }
  if (isPhotosLoading) {
    return <div>Photos loading...</div>
  }

  return (
    <div className="album-page">
      <div className="album-page__photos">
        {photos && photos.map((photo: any) => {
          return <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${photo.file}`} key={photo.id} />
        })}
      </div>
      <button onClick={() => setIsPhotoModalActive(true)}>
        photo
      </button>
      <ModalTemplate visible={isPhotoModalActive} setVisible={setIsPhotoModalActive} >
        <PhotoFormModal albumId={album_id} refetchPhotos={refetchPhotos} />
      </ModalTemplate>
    </div>
  )
}

export default GalleryIdPage