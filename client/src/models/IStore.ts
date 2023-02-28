import { IUserSlice } from "./IUserSlice";

export interface IStore {
  user: IUserSlice;
  modal: {
    isPhotoActive: boolean;
    isAlbumActive: boolean;
    setIsActive: (isPhotoActive: boolean, isAlbumActive: boolean) => any;
  };
  notification: {
    isActive: boolean;
    setIsActive: (isActive: boolean) => any;
  };
}
