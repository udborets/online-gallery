import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { config } from "dotenv";
import appRouter from "./routers/index";
import fileUpload from "express-fileupload";
import path from "path";
import moment from "moment";
import IFileRequest from "./models/IFileRequest";
import { dbAddPhotoToAlbum } from "./db";

config();
const PORT = process.env.SERVER_PORT ?? 3000;
console.log(`server is running on port http://localhost:${PORT}`);
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/upload", (req, res) => {
  if (req.files) {
    const request = req as unknown as IFileRequest;
    const uploadedFile = request.files.userFile;
    const file = uploadedFile.name;
    const { customName, userId, albumId, photoDescription } = request.body;
    if (customName && userId && albumId && file) {
      const splittedName = uploadedFile.name.split(".");
      const ext = splittedName.at(-1);
      const fileName =
        splittedName.slice(0, -1).join(".") +
        moment().format("DDMMYYYY-HHmmss_SSS") +
        "." +
        ext;
      if (!ext) {
        res.sendStatus(400);
        return;
      }
      const uploadPath = path.resolve(__dirname, "static", fileName);
      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
          return;
        }
      });
      dbAddPhotoToAlbum(
        userId,
        albumId,
        customName,
        fileName,
        photoDescription ?? ""
      );
      res.sendStatus(200);
      return;
    } else {
      res.sendStatus(400);
      return;
    }
  } else {
    res.sendStatus(400);
    return;
  }
});
app.use("/api", createExpressMiddleware({ router: appRouter }));
app.listen(PORT);

export type AppRouter = typeof appRouter;
