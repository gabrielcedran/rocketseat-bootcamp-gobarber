import { injectable, inject } from "tsyringe";
import ApplicationError from "@shared/errors/ApplicationError";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequestDTO {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("storageProvider") private storageProvider: IStorageProvider,
  ) { }

  public async execute({ userId, avatarFilename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ApplicationError("User not found!", 400);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = filename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
