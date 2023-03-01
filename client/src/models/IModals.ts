export interface IModalTemplate {
  children: JSX.Element;
}

export interface IPhotoFormModal {
  albumId: string;
  refetchPhotos: () => void;
}
