import trpc from "../trpc";
import { z } from "zod";
import {
  dbCreateUser,
  dbDeleteUserByName,
  dbGetUserByName,
  dbUpdateUserAvatar,
  dbUpdateUserName,
  dbGetAllUsers,
} from "../db";

export default trpc.router({
  getUserByName: trpc.procedure
    .input(z.object({ userName: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserByName(input.userName);
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
        input.userName,
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
