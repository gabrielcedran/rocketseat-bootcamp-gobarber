import { getRepository } from "typeorm";
import User from "../models/User";

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
      throw Error("Email already registered!");
    }

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
