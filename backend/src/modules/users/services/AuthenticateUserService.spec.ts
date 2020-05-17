import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import ApplicationError from "@shared/errors/ApplicationError";

describe("AuthenticateUser", () => {
  it("should return a valid access token when credentials are correct", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();

    const authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);
    const createUserService = new CreateUserService(usersRepositoryMock, hashProvider);

    const user = await createUserService.execute({ name: "Bob Don", email: "don@bob.com", password: "abc" });

    const response = await authenticateUserService.execute({ email: "don@bob.com", password: "abc" });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existent user", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();

    const authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);

    expect(authenticateUserService.execute({ email: "don@bob.com", password: "abc" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });

  it("should not be able to authenticate with invalid password", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();
    const createUserService = new CreateUserService(usersRepositoryMock, hashProvider);

    await createUserService.execute({ name: "Bob Don", email: "don@bob.com", password: "abc" });

    const authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);

    expect(authenticateUserService.execute({ email: "don@bob.com", password: "abd" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
