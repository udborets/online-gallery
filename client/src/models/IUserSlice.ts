import IUserInfo from "./IUserInfo";

export default interface IUserSlice {
  userInfo: IUserInfo;
  isAuth?: boolean;
  token?: string | null;
}
