import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import authConfig from "@config/auth";
import ApplicationError from "@shared/errors/ApplicationError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequestDTO {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(@inject("usersRepository") private usersRepository: IUsersRepository) { }

  public async execute({ email, password }: IRequestDTO): Promise<{ user: User; token: string }> {

    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) {
      throw new ApplicationError("Could not authenticate. Please verify your data.", 401);
    }

    const passwordMatch = await compare(password, userFound.password);
    if (!passwordMatch) {
      throw new ApplicationError("Could not authenticate. Please verify your data.", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: userFound.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: userFound, token };
  }
}

export default AuthenticateUserService;
