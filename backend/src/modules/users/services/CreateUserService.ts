import { hash } from "bcryptjs";
import ApplicationError from "@shared/errors/ApplicationError";
import User from "../infra/typeorm/entities/User";
import IUsersRepositories from "../repositories/IUsersRepository";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepositories) { }

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const emailRegistered = await this.usersRepository.findByEmail(email);

    if (emailRegistered) {
      throw new ApplicationError("Email already registered!", 409);
    }

    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
