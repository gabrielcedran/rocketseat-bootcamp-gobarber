import path from "path";
import multer from "multer";
import crypto from "crypto";

const storageFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  storage: multer.diskStorage({
    destination: storageFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("HEX");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
  limits: { fileSize: 1024 * 1024 },
  destinationPath: storageFolder,
};
