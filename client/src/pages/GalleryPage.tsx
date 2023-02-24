import useServer from './../hooks/useServer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import "../styles/pages/GalleryPage.scss";

const GalleryPage = () => {
  const { id } = useParams()
  const { getUserById } = useServer();
  const [pageUser, setPageUser] = useState<any>()
  const { user } = useUser();
  useEffect(() => {
    if (id) {
      getUserById(id).then(fetchedUser => setPageUser(fetchedUser))
    }
    else {
      setPageUser(user.userInfo);
    }
  }, [id])
  return (
    <div className='gallery-page'>
      {pageUser?.name} gallery
    </div>
  )
}

export default GalleryPage