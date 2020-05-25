import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import CacheProviderMock from "@shared/container/providers/CacheProvider/mocks/CacheProviderMock";

let usersRepositoryMock: UsersRepositoryMock;
let hashProvider: HashProviderMock;
let authenticateUserService: AuthenticateUserService;
let cacheProvider: CacheProviderMock;
let createUserService: CreateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    hashProvider = new HashProviderMock();
    cacheProvider = new CacheProviderMock();
    authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);
    createUserService = new CreateUserService(usersRepositoryMock, hashProvider, cacheProvider);
  });

  it("should return a valid access token when credentials are correct", async () => {
    const user = await createUserService.execute({ name: "Bob Don", email: "don@bob.com", password: "abc" });

    const response = await authenticateUserService.execute({ email: "don@bob.com", password: "abc" });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existent user", async () => {
    expect(authenticateUserService.execute({ email: "don@bob.com", password: "abc" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });

  it("should not be able to authenticate with invalid password", async () => {
    await createUserService.execute({ name: "Bob Don", email: "don@bob.com", password: "abc" });

    await expect(authenticateUserService.execute({ email: "don@bob.com", password: "abd" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
