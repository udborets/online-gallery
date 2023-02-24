import trpc from "../trpc";
import { z } from "zod";
import {
  dbAddAlbum,
  dbCreateUser,
  dbDeleteAll,
  dbGetAllPhotosByUserId,
  dbGetAllUsers,
  dbGetPhotoById,
  dbGetUserByEmail,
  dbGetUserById,
} from "../db";

export const userRouter = trpc.router({
  createUser: trpc.procedure
    .input(z.object({ userEmail: z.string(), userName: z.string() }))
    .query(async ({ input }) => {
      const user = await dbCreateUser(input.userEmail, input.userName);
      return user;
    }),
  addAlbum: trpc.procedure
    .input(
      z.object({
        userId: z.string(),
        albumName: z.string(),
        albumDescription: z.string(),
      })
    )
    .query(async ({ input }) => {
      const album = await dbAddAlbum(
        input.userId,
        input.albumName,
        input.albumDescription
      );
      return album;
    }),
  getUserById: trpc.procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await dbGetUserById(input.userId);
      if (user) return await dbGetUserById(user.id);
    }),
  getUserByEmail: trpc.procedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserByEmail(input.userEmail);
    }),
  deleteAll: trpc.procedure.query(async () => {
    return await dbDeleteAll();
  }),
  getAll: trpc.procedure.query(async () => {
    return await dbGetAllUsers();
  }),
});
