import axios from 'axios';
import { useState } from 'react';

import useNotification from '../../hooks/useNotification';
import useUser from '../../hooks/useUser';
import { IPhotoFormModalProps } from '../../models/IModalsProps';
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from '../../utils/consts';

const PhotoFormModal = ({ albumId, refetchPhotos }: IPhotoFormModalProps) => {
  const { user, fetchUser } = useUser();
  const [file, setFile] = useState<any>(null);
  const [customName, setCustomName] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const { showNotification, showNotificationWithTimeout } = useNotification();
  async function uploadFile(e: any) {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      showNotificationWithTimeout("You have to enter photo file", NotificationTypes.WARNING, 6000);
      return
    }
    if (!customName) {
      showNotificationWithTimeout("You have to enter photo name", NotificationTypes.WARNING, 6000);
      return;
    }
    if (!user?.id) {
      showNotification("Error while trying to read user id", NotificationTypes.ERROR);
      return
    }
    if (!albumId) {
      showNotification("Error while trying to read album id", NotificationTypes.ERROR);
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
      showNotificationWithTimeout("Successfully uploaded a photo", NotificationTypes.SUCCESS, 6000);
    }
    else {
      showNotification("Error while trying to read album id", NotificationTypes.ERROR);
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