import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import appRouter from "./routers/index";

config();
const app = express();
const PORT = process.env.SERVER_PORT ?? 5000;
console.log(`server is running on port http://localhost:${PORT}`);
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", createExpressMiddleware({ router: appRouter }));
app.listen(PORT);

export type AppRouter = typeof appRouter;
