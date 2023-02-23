export default interface IUserSlice {
  userInfo: {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string | null;
    albums: any | null;
    photos: any | null;
    createdAt: any | null;
    updatedAt: any | null;
  };
  isAuth: boolean;
  token: string | null;
}
