import trpc from "../trpc";
import { userRouter } from './userRouter';

export default trpc.router({
    users: userRouter,
});
