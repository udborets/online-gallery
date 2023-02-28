import axios from 'axios';
import { useState } from 'react';
import useUser from '../../hooks/useUser';

const PhotoFormModal = () => {
  const { user, fetchUser } = useUser();
  const [file, setFile] = useState<any>(null);
  const [customName, setCustomName] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  async function uploadFile(e: any) {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      setTimeout(() => {
      }, 5000);
      return
    }
    if (!customName) {
      setTimeout(() => {
      }, 5000);
      return;
    }
    if (!user.userInfo.id) {
      setTimeout(() => {
      }, 5000);
      return
    }
    formData.append("userFile", file);
    formData.append("userId", user.userInfo.id);
    formData.append("albumId", user.userInfo.albums[0].id);
    formData.append("customName", customName);
    formData.append("photoDescription", photoDescription);
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/upload`, formData)
    if (response.data === "OK") {
      setFile(null);
      setCustomName('');
      setPhotoDescription('');
      setTimeout(() => {
      }, 5000);
      await fetchUser(user.userInfo.id);
    }
    else {
      console.error("error happened white fetching axios request:", response);
    }
  }
  return (
    <form className='photo-form' onClick={(e) => e.stopPropagation()}>
      <input
        className='modal-form__name'
        type="text"
        onChange={(e) => setCustomName(e.target.value)}
        value={customName}
      />
      <textarea
        className='modal-form__description'
        onChange={(e) => setPhotoDescription(e.target.value)}
        value={photoDescription}
      />
      <input
        type="file"
        name='userFile'
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button
        className='photo-form__submit'
        type='submit'
        onClick={(e) => uploadFile(e)}
      >
        Send file
      </button>
    </form>
  )
}

export default PhotoFormModal