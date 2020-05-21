import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let usersRepositoryMock: UsersRepositoryMock;
let hashProvider: HashProviderMock;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    hashProvider = new HashProviderMock();
    authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);
    createUserService = new CreateUserService(usersRepositoryMock, hashProvider);
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
