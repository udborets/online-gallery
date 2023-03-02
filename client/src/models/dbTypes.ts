import {
  User as dbUser,
  Album as dbAlbum,
  Photo as dbPhoto,
} from "../../../server/src/db";

export type IUser = {
  user: dbUser;
  albums: dbAlbum[];
  photos: dbPhoto[];
};

export type IAlbum = dbAlbum;
export type IPhoto = dbPhoto;
