import trpc from "../trpc";
import { z } from "zod";
import {
  dbCreateUser,
  dbDeleteAll,
  dbGetAllPhotosByUserId,
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
    await dbDeleteAll();
  }),
});
