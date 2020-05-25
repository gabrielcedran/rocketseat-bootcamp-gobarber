import ApplicationError from "@shared/errors/ApplicationError";
import CacheProviderMock from "@shared/container/providers/CacheProvider/mocks/CacheProviderMock";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import CreateUserService from "./CreateUserService";

let usersRepositoryMock: UsersRepositoryMock;
let hashProvider: HashProviderMock;
let cacheProvider: CacheProviderMock;
let createUserService: CreateUserService;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    hashProvider = new HashProviderMock();
    cacheProvider = new CacheProviderMock();
    createUserService = new CreateUserService(usersRepositoryMock, hashProvider, cacheProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    expect(user).toHaveProperty("id");
    expect(user.password).toEqual("123");
  });

  it("should not be able to create a new user with existent email", async () => {
    await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    await expect(
      createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
