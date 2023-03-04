import useServer from "./../hooks/useServer";

const { getAlbumById, getPhotoById } = useServer();

type Role = {
  BASIC: "BASIC";
  ADMIN: "ADMIN";
};

export type IdbPhoto = Awaited<ReturnType<typeof getPhotoById>>;
export type IdbAlbum = Awaited<ReturnType<typeof getAlbumById>>;

export type IdbUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  photos: IdbPhoto[];
  albums: IdbAlbum[];
};
