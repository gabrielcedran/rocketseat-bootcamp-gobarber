import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("cacheProvider") private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ userId: exceptUserId }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.get<User[]>(`providers-list:${exceptUserId}`);

    if (providers) {
      return providers;
    }

    providers = await this.usersRepository.findAllProviders({ exceptUserId });

    await this.cacheProvider.put(`providers-list:${exceptUserId}`, providers);

    return providers;
  }
}

export default ListProvidersService;
