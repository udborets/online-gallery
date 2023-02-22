import trpc from "../trpc";
import { z } from "zod";
import {
  dbCreateUser,
  dbDeleteAll,
  dbGetAllPhotosByUserId,
  dbGetPhotoById,
  dbGetUserById,
} from "../db";

const userGetter = trpc.procedure.input(
  z.object({ userEmail: z.string(), userName: z.string() })
);

const photoGetter = trpc.procedure.input(z.object({ userId: z.string() }));

export const userRouter = trpc.router({
  getUserById: userGetter.query(async ({ input }) => {
    const user = await dbCreateUser(input.userEmail, input.userName);
    return await dbGetUserById(user.id);
  }),
  getPhotosById: photoGetter.query(async ({ input }) => {
    const photos = await dbGetAllPhotosByUserId(input.userId);
    return photos;
  }),
  deleteAll: trpc.procedure.query(async () => {
    await dbDeleteAll();
  }),
});
