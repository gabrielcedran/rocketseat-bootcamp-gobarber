import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import aws, { S3 } from "aws-sdk";
import IStorageProvider from "../models/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.disk.tempPath, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: "utf-8",
    });

    await this.client
      .putObject({
        Bucket: uploadConfig.s3.bucket,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.s3.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
