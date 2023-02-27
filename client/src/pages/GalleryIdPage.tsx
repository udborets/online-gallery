import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { RoutePaths } from "../utils/consts";


const GalleryIdPage = () => {
  const { id: userId, albumId } = useParams();
  console.log(userId, albumId)
  const navigate = useNavigate();
  const { getUserById, getAllPhotosByAlbumId } = useServer();
  const [photos, setPhotos] = useState<any>(null);
  if (!albumId || !userId) {
    return <></>;
  }
  useEffect(() => {
    getUserById(userId).then((fetchedUser) => {
      if (!fetchedUser?.albums.map(album => album.id).includes(albumId)) {
        navigate(RoutePaths.NOTFOUND);
      }
      if (fetchedUser)
        getAllPhotosByAlbumId(albumId).then((fetchedAlbum) => {
          if (fetchedAlbum) {
            setPhotos(fetchedAlbum);
          }
        });
    })
  }, [])
  return (
    <div>
      {photos && photos.map((photo: any) => {
        return <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${photo.file}`} key={photo.id} />
      })}
    </div>
  )
}

export default GalleryIdPage