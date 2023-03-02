export interface IModalTemplateProps {
  children: JSX.Element;
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export interface IPhotoFormModalProps {
  albumId: string;
  refetchPhotos: () => void;
}
