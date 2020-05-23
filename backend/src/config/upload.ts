import path from "path";
import multer from "multer";
import crypto from "crypto";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");

export default {
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
  limits: { fileSize: 1024 * 1024 },
  tempPath: tempFolder,
  destinationPath: path.resolve(tempFolder, "uploads"),
};
