import trpc from "../trpc";
import { z } from "zod";
import {
  dbCreateUser,
  dbDeleteUserByName,
  dbGetUserByName,
  dbUpdateUserAvatar,
  dbUpdateUserName,
  dbGetAllUsers,
  dbGetUserByEmail,
  dbGetUserById,
} from "../db";

export default trpc.router({
  getUserByName: trpc.procedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserByName(input.userName);
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

  getAllUsers: trpc.procedure.query(async () => {
    return await dbGetAllUsers();
  }),

  createUser: trpc.procedure
    .input(
      z.object({
        userName: z.string(),
        userEmail: z.string(),
        avatarURL: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await dbCreateUser(
        input.userName,
        input.userEmail,
        input.avatarURL
      );
    }),

  updateUserName: trpc.procedure
    .input(z.object({ userName: z.string(), newName: z.string() }))
    .query(async ({ input }) => {
      return await dbUpdateUserName(input.userName, input.newName);
    }),

  updateUserAvatar: trpc.procedure
    .input(z.object({ userName: z.string(), avatarURL: z.string() }))
    .query(async ({ input }) => {
      return await dbUpdateUserAvatar(input.userName, input.avatarURL);
    }),

  deleteUserByName: trpc.procedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ input }) => {
      return await dbDeleteUserByName(input.userName);
    }),
});
