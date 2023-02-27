import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";

const GalleryIdPage = () => {
  const { user_id, album_id } = useParams();
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
    </div>
  )
}

export default GalleryIdPage