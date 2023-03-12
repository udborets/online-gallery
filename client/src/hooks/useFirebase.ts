import { getDownloadURL, listAll, ref } from "firebase/storage";

import { storage } from "../firebase/storage";

export default function useFirebase() {
  function getStorage() {
    return storage;
  }

  function getRef(path: string) {
    return ref(storage, path);
  }

  function createNewFileRef(
    userFolderName: string,
    albumFolderName: string,
    fileName: string
  ) {
    return ref(storage, `${userFolderName}/${albumFolderName}/${fileName}`);
  }

  async function getRefItems(path: string) {
    return await listAll(getRef(path));
  }

  async function getRefUrls(path: string) {
    const refItems = (await getRefItems(path)).items;
    let refUrls: string[] = [];
    for (let i = 0; i < refItems.length; i++) {
      refUrls.push(await getDownloadURL(refItems[i]));
    }
    return refUrls;
  }

  return {
    getStorage,
    createNewFileRef,
    getRef,
    getRefItems,
    getRefUrls,
  };
}
