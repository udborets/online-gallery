import { Album, Photo, Role } from "../../../server/src/db";

export type IdbUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  photos: Photo[];
  albums: Album[];
};
export type IdbPhoto = Photo;
export type IdbAlbum = Album;
