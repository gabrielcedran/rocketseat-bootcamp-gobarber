import { injectable, inject } from "tsyringe";
import ApplicationError from "@shared/errors/ApplicationError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("hashProvider") private hashProvider: IHashProvider,
  ) { }

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const emailRegistered = await this.usersRepository.findByEmail(email);

    if (emailRegistered) {
      throw new ApplicationError("Email already registered!", 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
