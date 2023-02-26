import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useServer from "../hooks/useServer";
import { RoutePaths } from "../utils/consts";
const GalleryIdPage = () => {
  const params = useParams();
  const paramId = params.id
  const navigate = useNavigate();
  const { getUserById, getAllPhotosByAlbumId } = useServer();
  const [photos, setPhotos] = useState<any>(null);
  if (!paramId) {
    navigate(RoutePaths.NOTFOUND);
    return;
  }
  useEffect(() => {
    getUserById(paramId).then((fetchedUser) => {
      if (fetchedUser)
        getAllPhotosByAlbumId(fetchedUser.albums[0].id).then((fetchedAlbum) => {
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