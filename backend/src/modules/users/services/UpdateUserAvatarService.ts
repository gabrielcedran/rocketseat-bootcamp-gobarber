import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import ApplicationError from "@shared/errors/ApplicationError";
import User from "../infra/typeorm/entities/User";
import IUsersRepositories from "../repositories/IUsersRepository";

interface IRequestDTO {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepositories) { }

  public async execute({ userId, avatarFilename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ApplicationError("User not found!", 400);
    }

    if (user.avatar) {
      const currentAvatarPath = path.join(uploadConfig.destinationPath, user.avatar);

      if (fs.existsSync(currentAvatarPath)) {
        await fs.promises.unlink(currentAvatarPath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
