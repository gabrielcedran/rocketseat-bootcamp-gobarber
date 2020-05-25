import path from "path";
import multer from "multer";
import crypto from "crypto";

const tempFolder = path.resolve(__dirname, "..", "..", "temp");

interface IUploadConfig {
  driver: "s3" | "disk";
  disk: {
    storage: multer.StorageEngine;
    tempPath: string;
    destinationPath: string;
  };
  s3: {
    bucket: string;
  };
}

export default {
  disk: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
    limits: { fileSize: 1024 * 1024 },
    destinationPath: path.resolve(tempFolder, "uploads"),
    tempPath: tempFolder,
  },
  s3: {
    bucket: process.env.AWS_BUCKET || "gobarber-gabrielcedran",
  },
  driver: process.env.STORAGE_DRIVER || "disk",
} as IUploadConfig;
