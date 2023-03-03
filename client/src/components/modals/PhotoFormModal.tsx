import axios from 'axios';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
import { IPhotoFormModalProps } from '../../models/IModalsProps';
import "../../styles/components/modals/PhotoFormModal.scss";

const PhotoFormModal = ({ albumId, refetchPhotos }: IPhotoFormModalProps) => {
  const { user, fetchUser } = useUser();
  const [file, setFile] = useState<any>(null);
  const [customName, setCustomName] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');

  async function uploadFile(e: any) {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      console.log("no file");
      setTimeout(() => {
      }, 5000);
      return
    }
    if (!customName) {
      console.log("no custom name");
      setTimeout(() => {
      }, 5000);
      return;
    }
    if (!user?.id) {
      console.log("no user info id");
      setTimeout(() => {
      }, 5000);
      return
    }
    if (!albumId) {
      console.log("no album id");
      setCustomName('no album id')
      setTimeout(() => {
        setCustomName('')
      }, 5000);
      return
    }
    formData.append("userFile", file);
    formData.append("userId", user.id);
    console.log(albumId)
    formData.append("albumId", albumId);
    formData.append("customName", customName);
    formData.append("photoDescription", photoDescription);
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/upload`, formData)
    if (response.data === "OK") {
      setCustomName('');
      setPhotoDescription('');
      setTimeout(() => {
      }, 5000);
      await fetchUser(user.id);
      refetchPhotos();
      console.log("refetched photos!");
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
        accept='image/*'
        name='userFile'
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
      <button
        className='modal-form__submit'
        type='submit'
        onClick={(e) => uploadFile(e)}
      >
        Upload file
      </button>
    </form>
  )
}

export default PhotoFormModal