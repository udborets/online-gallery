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
    const photoName = uploadedFile.name;
    const { customName, userId, albumId, photoDescription } =
      request.body;
    console.log(customName, "userId", userId, "albumId", albumId, "photoName", photoName, "photoDescription", photoDescription)
    if (customName && userId && albumId && photoName) {
      console.log(request.body.customName);
      const splittedName = uploadedFile.name.split(".");
      const ext = splittedName.at(-1);
      if (!ext) {
        res.sendStatus(400);
        console.log('ff')
        return;
      }
      const uploadPath = path.resolve(
        __dirname,
        "static",
        splittedName.slice(0, -1).join(".") +
          moment().format("DDMMYYYY-HHmmss_SSS") +
          "." +
          ext
      );
      uploadedFile.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
          return;
        }
      });
      dbAddPhotoToAlbum(userId, albumId, photoName, photoDescription ?? "");
      res.sendStatus(200);
      return;
    }
    else {
      res.sendStatus(400);
      console.log('ae')

      return;
    }
  } else {
    console.log('fwwwwwwww')

    res.sendStatus(400);
    return;
  }
});
app.use("/api", createExpressMiddleware({ router: appRouter }));
app.listen(PORT);

export type AppRouter = typeof appRouter;
