import { uuid } from "uuidv4";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";

class UsersRepositoryMock implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
    return user;
  }
}

export default UsersRepositoryMock;
