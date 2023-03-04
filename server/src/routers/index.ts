import trpc from "../trpc";
import { z } from "zod";
import {
  dbCreateUser,
  dbDeleteUserByEmail,
  dbGetUserByEmail,
  dbUpdateUserAvatar,
  dbUpdateUserName,
} from "../db";

export default trpc.router({
  getUserByEmail: trpc.procedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input }) => {
      return await dbGetUserByEmail(input.userEmail);
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
    .input(z.object({ userEmail: z.string(), userName: z.string() }))
    .query(async ({ input }) => {
      return await dbUpdateUserName(input.userEmail, input.userName);
    }),

  updateUserAvatar: trpc.procedure
    .input(z.object({ userEmail: z.string(), avatarURL: z.string() }))
    .query(async ({ input }) => {
      return await dbUpdateUserAvatar(input.userEmail, input.avatarURL);
    }),

  deleteUserByEmail: trpc.procedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input }) => {
      return await dbDeleteUserByEmail(input.userEmail);
    }),
});
