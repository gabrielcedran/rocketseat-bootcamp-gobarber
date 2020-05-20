import { injectable, inject } from "tsyringe";
import { isAfter, addHours } from "date-fns";
import ApplicationError from "@shared/errors/ApplicationError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("userTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("hasProvider") private hashProvider: IHashProvider,
  ) { }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new ApplicationError("User token does not exist.");
    }
    const user = await this.usersRepository.findById(userToken.userId);
    if (!user) {
      throw new ApplicationError("User does not exist.");
    }

    if (isAfter(Date.now(), addHours(userToken.createdAt, 2))) {
      throw new ApplicationError("Expired token.");
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
