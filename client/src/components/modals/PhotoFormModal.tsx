import { uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';

import useFirebase from '../../hooks/useFirebase';
import useNotification from '../../hooks/useNotification';
import useUser from '../../hooks/useUser';
import { IPhotoFormModalProps } from '../../models/IModalsProps';
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from '../../utils/consts';

const PhotoFormModal = ({ albumId, refetchPhotos }: IPhotoFormModalProps) => {
  const [file, setFile] = useState<any>(null);
  const [customFileName, setCustomFileName] = useState('');
  const { showNotification, showNotificationWithTimeout } = useNotification();
  const { createNewFileRef } = useFirebase();
  const nameInputRef = useRef(null);
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  })
  const { user } = useUser();
  if (!user || !user.email) {
    showNotification("Error happened while trying to get user email", NotificationTypes.ERROR);
    return <div></div>
  }
  async function uploadFile() {
    if (!file) {
      showNotificationWithTimeout("You have to choose a file photo name", NotificationTypes.WARNING, 5000);
      return;
    }
    if (!customFileName) {
      showNotificationWithTimeout("You have to enter photo name", NotificationTypes.WARNING, 5000);
    }
    const currUser = getAuth().currentUser;
    if (currUser && currUser.email) {
      const imageRef = createNewFileRef(user.id, albumId, customFileName);
      const response = await uploadBytes(imageRef, file);
      refetchPhotos();
      return response;
    }
    if (!currUser || (currUser && !currUser.email)) {
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
        ref={nameInputRef}
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