import {
  ref,
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

  function getRef(path: string) {
    return ref(storage, path);
  }

  function createNewFileRef(
    userFolderName: string,
    albumFolderName: string,
    fileName: string
  ) {
    return ref(
      storage,
      `${userFolderName}/${albumFolderName}/${fileName}`
    );
  }

  async function getRefItems(ref: StorageReference) {
    return await listAll(ref);
  }

  async function getRefUrls(ref: StorageReference) {
    const refItems = await getRefItems(ref);
    const refUrls: string[] = [];
    refItems.items.forEach(async (item) => {
      const itemUrl = await getDownloadURL(item);
      refUrls.push(itemUrl);
    });
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
