import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../models/User";
import ApplicationError from "../errors/ApplicationError";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const emailRegistered = await usersRepository.findOne({
      where: { email },
    });

    if (emailRegistered) {
      throw new ApplicationError("Email already registered!", 409);
    }

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
