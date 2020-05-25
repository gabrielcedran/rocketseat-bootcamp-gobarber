import UsersRepositoryMock from "@modules/users/repositories/mock/UsersRepositoryMock";
import CacheProviderMock from "@shared/container/providers/CacheProvider/mocks/CacheProviderMock";
import ListProvidersService from "./ListProvidersService";

let usersRepository: UsersRepositoryMock;
let cacheProviderMock: CacheProviderMock;
let listProvidersService: ListProvidersService;

describe("ListProvidersService", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    cacheProviderMock = new CacheProviderMock();
    listProvidersService = new ListProvidersService(usersRepository, cacheProviderMock);
  });

  it("should be able to list the providers", async () => {
    const mary = await usersRepository.create({ name: "Mary", email: "mary@mary.com", password: "1234" });
    const bob = await usersRepository.create({ name: "Don", email: "don@don.com", password: "1234" });
    const loggedUser = await usersRepository.create({ name: "Bob", email: "bob@bob.com", password: "1234" });

    const providers = await listProvidersService.execute({ userId: loggedUser.id });

    expect(providers).toEqual([mary, bob]);
  });
});
