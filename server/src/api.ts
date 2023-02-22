import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { config } from "dotenv";
import appRouter from "./routers/index";

config();
const PORT = process.env.SERVER_PORT ?? 3000;
console.log(`server is running on port http://localhost:${PORT}`);
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api", createExpressMiddleware({ router: appRouter }));
app.listen(PORT);

export type AppRouter = typeof appRouter;
