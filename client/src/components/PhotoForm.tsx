import axios from 'axios';
import { useState } from 'react'
import useUser from '../hooks/useUser';

const PhotoForm = () => {
  const { user, fetchUser } = useUser();
  const [file, setFile] = useState<any>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [customName, setCustomName] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [notification, setNotification] = useState('');
  async function uploadFile(e: any) {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      setNotification("You have to set file");
      setTimeout(() => {
        setNotification('');
      }, 5000);
      return
    }
    if (!customName) {
      setNotification("Enter photo name");
      setTimeout(() => {
        setNotification('');
      }, 5000);
      return;
    }
    if (!user.userInfo.id) {
      setNotification("You have to be authorized");
      setTimeout(() => {
        setNotification('');
      }, 5000);
      return
    }
    formData.append("userFile", file);
    formData.append("userId", user.userInfo.id);
    formData.append("albumId", user.userInfo.albums[0].id);
    formData.append("customName", customName);
    formData.append("photoDescription", photoDescription);
    console.log(file)
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/upload`, formData)
    if (response.data === "OK") {
      setIsUploaded(true);
      setFile(null);
      setTimeout(() => {
        setIsUploaded(false);
      }, 5000);
      await fetchUser(user.userInfo.id);
    }
    else {
      console.error("error happened white fetching axios request:", response);
    }
  }
  return (
    <div className='photo-form'>
      {user.userInfo.photos.map((photo: any) => photo.id)}
      <input
        type="text"
        onChange={(e) => setCustomName(e.target.value)}
      />
      <textarea
        onChange={(e) => setPhotoDescription(e.target.value)}
      />
      <input
        type="file"
        name='userFile'
        value={file}
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button
        onClick={(e) => uploadFile(e)}
      >
        Send file
      </button>
      {isUploaded && "File uploaded successfully"}
      {notification && notification}
    </div>
  )
}

export default PhotoForm