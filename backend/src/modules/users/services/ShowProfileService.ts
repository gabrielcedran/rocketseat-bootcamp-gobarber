import { inject, injectable } from "tsyringe";
import ApplicationError from "@shared/errors/ApplicationError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(@inject("usersRepository") private usersRepository: IUsersRepository) { }

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ApplicationError("user not found");
    }
    return user;
  }
}

export default ShowProfileService;
