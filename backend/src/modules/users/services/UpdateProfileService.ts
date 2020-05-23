import { inject, injectable } from "tsyringe";
import ApplicationError from "@shared/errors/ApplicationError";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import User from "../infra/typeorm/entities/User";

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("hashProvider") private hashProvider: IHashProvider,
  ) { }

  public async execute({ userId, name, email, oldPassword, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ApplicationError("user not found");
    }

    const userWithDesiredEmail = await this.usersRepository.findByEmail(email);
    if (userWithDesiredEmail && userWithDesiredEmail.id !== user.id) {
      throw new ApplicationError("user not found");
    }

    user.name = name;
    user.email = email;

    if (password && (!oldPassword || !(await this.hashProvider.compareHash(oldPassword, user.password)))) {
      throw new ApplicationError("Current password mandatory to update to a new passowrd");
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
