import useServer from './../hooks/useServer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "../styles/pages/GalleryPage.scss";
import AlbumForm from './../components/AlbumForm';

const GalleryPage = () => {
  const { id } = useParams();
  const { getUserById } = useServer();
  const [currentUser, setCurrentUser] = useState<any>(null);
  if (id) {
    getUserById(id).then((fetchedUser: any) => setCurrentUser(fetchedUser))
    return (
      <div className='gallery-page'>
        <AlbumForm {...currentUser} />
      </div>
    )
  }
  else {
    return (
      <div className='gallery-page'>
        helloing
      </div>
    )
  }
}

export default GalleryPage