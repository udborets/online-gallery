import { getAuth } from 'firebase/auth';
import { uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";

import useFirebase from '../../hooks/useFirebase';
import useNotification from '../../hooks/useNotification';
import useUser from '../../hooks/useUser';
import "../../styles/components/modals/PhotoFormModal.scss";
import { NotificationTypes } from '../../utils/consts';

const PhotoFormModal = ({ refetch }: { refetch: () => void }) => {
  const [file, setFile] = useState<any>(null);
  const [customFileName, setCustomFileName] = useState('');
  const { showNotification, showNotificationWithTimeout } = useNotification();
  const { createNewFileRef, getRefItems } = useFirebase();
  const { album_name } = useParams();
  const nameInputRef = useRef(null);
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  })
  const { user } = useUser();
  async function uploadFile() {
    if (!customFileName) {
      showNotificationWithTimeout("You have to enter photo name", NotificationTypes.WARNING, 5000);
      return;
    }
    if (!file) {
      showNotificationWithTimeout("You have to select a file to upload", NotificationTypes.WARNING, 5000);
      return;
    }
    const currUser = getAuth().currentUser;
    if (currUser && currUser.email) {
      if (!album_name) {
        showNotification("Error happened while trying to get album id", NotificationTypes.ERROR);
        return;
      }
      const isHasSameName = !!(await getRefItems(`${user.id}/${album_name}`)).items.find((albumFile) => albumFile.name === customFileName);
      if (isHasSameName) {
        showNotificationWithTimeout("This album already has file with that name. Please, choose another one", NotificationTypes.WARNING, 5000);
        return;
      }
      const imageRef = createNewFileRef(user.id, album_name, customFileName);
      await uploadBytes(imageRef, file);
      setCustomFileName("");
      refetch();
      showNotificationWithTimeout("Successfully uploaded file", NotificationTypes.SUCCESS, 5000);
      return;
    }
    if (!currUser || (currUser && !currUser.email)) {
      showNotification("Error happened while trying to get user email", NotificationTypes.ERROR);
      return;
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
        onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
      />
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