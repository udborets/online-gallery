import { useState } from 'react';
import { uploadBytes } from "firebase/storage";

import useNotification from '../../hooks/useNotification';
import { IPhotoFormModalProps } from '../../models/IModalsProps';
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from '../../utils/consts';
import { getAuth } from 'firebase/auth';
import useFirebase from '../../hooks/useFirebase';

const PhotoFormModal = ({ albumId, refetchPhotos }: IPhotoFormModalProps) => {
  const [file, setFile] = useState<any>(null);
  const [customFileName, setCustomFileName] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const { showNotification, showNotificationWithTimeout } = useNotification();
  const { createNewFileRef } = useFirebase();
  const user = getAuth().currentUser;
  if (!user || !user.email) {
    showNotification("Error happened while trying to get user email", NotificationTypes.ERROR);
    return <div></div>
  }
  const user_name = user.email;
  async function uploadFile() {
    if (!file) {
      showNotificationWithTimeout("You have to choose a file photo name", NotificationTypes.WARNING, 5000);
      return;
    }
    if (!customFileName) {
      showNotificationWithTimeout("You have to enter photo name", NotificationTypes.WARNING, 5000);
    }
    const user = getAuth().currentUser;
    if (user && user.email) {
      const imageRef = createNewFileRef(user_name, albumId, customFileName);
      const response = await uploadBytes(imageRef, file);
      return response;
    }
    if (!user || (user && !user.email)) {
      showNotification("Error happened while trying to get user email", NotificationTypes.ERROR);
      return
    }
  }
  return (
    <form className='modal-form' onClick={(e) => e.stopPropagation()}>
      <input
        className='modal-form__input'
        type="text"
        onChange={(e) => setCustomFileName(e.target.value)}
        value={customFileName}
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
        type='button'
        onClick={async () => await uploadFile()}
      >
        Upload file
      </button>
    </form>
  )
}

export default PhotoFormModal