import {
  ref,
  uploadBytes,
  listAll,
  StorageReference,
  getDownloadURL,
} from "firebase/storage";
import { uuidv4 } from "@firebase/util";

import { storage } from "../firebase/storage";

export default function useFirebase() {
  function getStorage() {
    return storage;
  }
  function getUserFolderRef(email: string) {
    return ref(storage, email + "/");
  }
  function getAlbumFolderRef(email: string, albumId: string) {
    return ref(storage, email + "/" + albumId + "/");
  }
  function createNewFileRef(
    userFolderName: string,
    albumFolderName: string,
    fileName: string
  ) {
    return ref(
      storage,
      `${userFolderName}/${albumFolderName}/${fileName + "uuidv4-" + uuidv4()}`
    );
  }
  async function getRefItems(ref: StorageReference) {
    return await listAll(ref);
  }
  async function getRefUrls(ref: StorageReference) {
    const refItems = await getRefItems(ref);
    const refUrls: string[] = [];
    refItems.items.map(async (item) => {
      const itemUrl = await getDownloadURL(item);
      refUrls.push(itemUrl);
    });
    return refUrls;
  }
  return {
    getStorage,
    createNewFileRef,
    getUserFolderRef,
    getAlbumFolderRef,
    getRefItems,
    getRefUrls,
  };
}
