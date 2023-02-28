import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import "../../styles/components/modals/PhotoFormModal.scss";

const PhotoFormModal = ({ albumId }: any) => {
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
    if (!albumId) {
      setCustomName('no album id')
      setTimeout(() => {
        setCustomName('')
      }, 5000);
      return
    }
    formData.append("userFile", file);
    formData.append("userId", user.userInfo.id);
    console.log(albumId)
    formData.append("albumId", albumId);
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
    <form className='modal-form' onClick={(e) => e.stopPropagation()}>
      <input
        className='modal-form__input'
        type="text"
        onChange={(e) => setCustomName(e.target.value)}
        value={customName}
        placeholder="Enter photo name"
      />
      <textarea
        className='modal-form__description'
        placeholder='Enter photo description'
        onChange={(e) => setPhotoDescription(e.target.value)}
        value={photoDescription}
      />
      <input
        type="file"
        name='userFile'
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button
        className='modal-form__submit'
        type='submit'
        onClick={(e) => uploadFile(e)}
      >
        Send file
      </button>
    </form>
  )
}

export default PhotoFormModal