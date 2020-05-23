import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(@inject("usersRepository") private usersRepository: IUsersRepository) { }

  public async execute({ userId: exceptUserId }: IRequest): Promise<User[]> {
    return this.usersRepository.findAllProviders({ exceptUserId });
  }
}

export default ListProvidersService;
