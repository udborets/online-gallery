import { useState } from "react";
import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";
import PhotoFormModal from "../components/modals/PhotoFormModal";
import ModalTemplate from "../components/modals/templates/ModalTemplate";
import useServer from "../hooks/useServer";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
  const [isPhotoModalActive, setIsPhotoModalActive] = useState(false);
  if (!album_id || !user_id) {
    return <div>there is no album_id or user_id parameter in query</div>
  }
  const { getUserById, getAllPhotosByAlbumId } = useServer();
  const {
    data: isHasAlbum,
    isError: isHasAlbumError,
    error: hasAlbumError,
    isLoading: isHasAlbumLoading,
  } =
    useQuery({
      queryFn: async () => {
        const fetchedUser = await getUserById(user_id);
        if (!fetchedUser) {
          return false;
        }
        return fetchedUser.albums.filter(album => album.id === album_id);
      }, queryKey: ["currentUser"]
    });
  const {
    data: photos,
    error: photoError,
    isLoading: isPhotosLoading,
    isError: isPhotoError } =
    useQuery({
      queryKey: ["photos"],
      queryFn: async () => await getAllPhotosByAlbumId(album_id)
    });

  if (!isHasAlbum) {
    return <div>this user does not have album you are trying to get</div>
  }
  if (isHasAlbumError) {
    console.error(hasAlbumError);
    return <div>{JSON.stringify(hasAlbumError)}</div>
  }
  if (isPhotoError) {
    console.error(photoError);
    return <div>{JSON.stringify(photoError)}</div>
  }
  if (isPhotosLoading || isHasAlbumLoading) {
    return <div>Photos loading...</div>
  }

  return (
    <div>
      {photos && photos.map((photo: any) => {
        return <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${photo.file}`} key={photo.id} />
      })}

      <button onClick={() => setIsPhotoModalActive(true)}>
        photo
      </button>
      <ModalTemplate visible={isPhotoModalActive} setVisible={setIsPhotoModalActive} >
        <PhotoFormModal albumId={album_id} />
      </ModalTemplate>
    </div>
  )
}

export default GalleryIdPage