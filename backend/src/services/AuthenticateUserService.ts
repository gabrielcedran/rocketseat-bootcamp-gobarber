import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/User";

interface RequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const userFound = await usersRepository.findOne({
      where: { email },
    });
    if (!userFound) {
      throw Error("Could not authenticate. Please verify your data.");
    }

    const passwordMatch = await compare(password, userFound.password);
    if (!passwordMatch) {
      throw Error("Could not authenticate. Please verify your data.");
    }

    const token = sign({}, "secure-password", {
      subject: userFound.id,
      expiresIn: "1d",
    });

    return { user: userFound, token };
  }
}

export default AuthenticateUserService;
