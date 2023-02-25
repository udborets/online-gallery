import trpc from "../trpc";
import { z } from "zod";
import {
  dbAddAlbum,
  dbAddPhotoToAlbum,
  dbCreateUser,
  dbDeleteAlbumById,
  dbDeleteAll,
  dbDeletePhotoById,
  dbGetAlbumById,
  dbGetAllAlbums,
  dbGetAllAlbumsByUserId,
  dbGetAllPhotos,
  dbGetAllPhotosByAlbumId,
  dbGetAllPhotosByUserId,
  dbGetAllUsers,
  dbGetPhotoById,
  dbGetUserByEmail,
  dbGetUserById,
  dbRenamePhotoById,
  dbRenameUserById,
} from "../db";

export default trpc.router({
  getAllUsers: trpc.procedure.query(async () => {
    return await dbGetAllUsers();
  }),
  getUserByEmail: trpc.procedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserByEmail(input.userEmail);
    }),
  getUserById: trpc.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserById(input.userId);
    }),
  getAllPhotos: trpc.procedure.query(async () => {
    return await dbGetAllPhotos();
  }),
  getAllAlbums: trpc.procedure.query(async () => {
    return await dbGetAllAlbums();
  }),
  getAllPhotosByUserId: trpc.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetAllPhotosByUserId(input.userId);
    }),
  deletePhotoById: trpc.procedure
    .input(z.object({ photoId: z.string() }))
    .query(async ({ input }) => {
      return await dbDeletePhotoById(input.photoId);
    }),
  addPhotoToUserAlbum: trpc.procedure
    .input(
      z.object({
        userId: z.string(),
        albumId: z.string(),
        photoName: z.string(),
        file: z.string(),
        photoDescription: z.string(),
      })
    )
    .query(async ({ input }) => {
      const photo = await dbAddPhotoToAlbum(
        input.userId,
        input.albumId,
        input.photoName,
        input.file,
        input.photoDescription
      );
      return photo;
    }),
  getAllAlbumsByUserId: trpc.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetAllAlbumsByUserId(input.userId);
    }),
  getAlbumById: trpc.procedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetAlbumById(input.albumId);
    }),
  getPhotoById: trpc.procedure
    .input(z.object({ photoId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetPhotoById(input.photoId);
    }),
  addAlbumToUser: trpc.procedure
    .input(
      z.object({
        userId: z.string(),
        albumName: z.string(),
        albumDescription: z.string(),
        isPrivate: z.boolean(),
      })
    )
    .query(async ({ input }) => {
      const album = await dbAddAlbum(
        input.userId,
        input.albumName,
        input.albumDescription,
        input.isPrivate
      );
      return album;
    }),
  deleteAlbumId: trpc.procedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      return await dbDeleteAlbumById(input.albumId);
    }),
  getAllPhotosByAlbumId: trpc.procedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      return await dbGetAllPhotosByAlbumId(input.albumId);
    }),
  changeUserNameById: trpc.procedure
    .input(z.object({ userId: z.string(), newName: z.string() }))
    .query(async ({ input }) => {
      const user = await dbRenameUserById(input.userId, input.newName);
      return user;
    }),
  renamePhotoById: trpc.procedure
    .input(z.object({ photoId: z.string(), newName: z.string() }))
    .query(async ({ input }) => {
      return await dbRenamePhotoById(input.photoId, input.newName);
    }),
  renameAlbumById: trpc.procedure
    .input(z.object({ albumId: z.string(), newName: z.string() }))
    .query(async ({ input }) => {
      return await dbRenamePhotoById(input.albumId, input.newName);
    }),
  renameUserById: trpc.procedure
    .input(z.object({ userId: z.string(), newName: z.string() }))
    .query(async ({ input }) => {
      return await dbRenameUserById(input.userId, input.newName);
    }),
  deleteAlbumById: trpc.procedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      return await dbDeleteAlbumById(input.albumId);
    }),
  deleteAll: trpc.procedure.query(async () => {
    return await dbDeleteAll();
  }),
  createUser: trpc.procedure
    .input(z.object({ userEmail: z.string(), userName: z.string() }))
    .query(async ({ input }) => {
      const user = await dbCreateUser(input.userEmail, input.userName);
      return user;
    }),
});
