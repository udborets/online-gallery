import IUploadedFile from "./IUploadedFile";

export default interface IFileRequest {
  files: {
    userFile: IUploadedFile;
  };
  body: {
    customName: string;
    userId: string;
    albumId: string;
    photoName: string;
    photoDescription: string;
  };
  customName: any;
}
