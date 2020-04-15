import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import User from "../models/User";
import uploadConfig from "../config/upload";
import ApplicationError from "../errors/ApplicationError";

interface RequestDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new ApplicationError("User not found!", 400);
    }

    if (user.avatar) {
      const currentAvatarPath = path.join(
        uploadConfig.destinationPath,
        user.avatar,
      );

      if (fs.existsSync(currentAvatarPath)) {
        await fs.promises.unlink(currentAvatarPath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
