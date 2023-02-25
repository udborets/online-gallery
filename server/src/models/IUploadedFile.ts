export default interface IUploadedFile {
  name: string;
  data: object;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: (path: string, cb: (err: any) => any) => void;
}
