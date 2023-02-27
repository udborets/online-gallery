import { useQuery } from "react-query/react";
import { useParams } from "react-router-dom";
import useServer from "../hooks/useServer";

const GalleryIdPage = () => {
  const { userId, albumId } = useParams();
  if (!albumId || !userId) {
    return <div>there is no albumId or userId parameter in query</div>
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
        const fetchedUser = await getUserById(userId);
        if (!fetchedUser) {
          return false;
        }
        return fetchedUser.albums.filter(album => album.id === albumId);
      }, queryKey: ["currentUser"]
    });
  const {
    data: photos,
    error: photoError,
    isLoading: isPhotosLoading,
    isError: isPhotoError } =
    useQuery({
      queryKey: ["photos"],
      queryFn: async () => await getAllPhotosByAlbumId(albumId)
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