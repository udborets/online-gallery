import { ref, uploadBytes, listAll, StorageReference } from "firebase/storage";
import { uuidv4 } from "@firebase/util";

import { storage } from "../firebase/storage";

export default function useFirebase() {
  function getStorage() {
    return storage;
  }
  function getRef(path: string) {
    return ref(storage, path);
  }
  function getUUIDName(name: string) {
    return `${name + "uuidv4-" + uuidv4()}`;
  }
  function getFilePath(
    userFolderName: string,
    albumFolderName: string,
    fileName: string
  ) {
    return `${userFolderName}/${albumFolderName}/${getUUIDName(fileName)}`;
  }
  async function uploadFile(ref: StorageReference, file: Blob) {
    return await uploadBytes(ref, file);
  }
  async function getRefItems(ref: StorageReference) {
    return await listAll(ref);
  }
  return {
    getStorage,
    getRef,
    getUUIDName,
    getFilePath,
    uploadFile,
    getRefItems,
  };
}
