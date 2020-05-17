import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  it("should return a valid access token when credentials are correct", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();

    const authenticateUserService = new AuthenticateUserService(usersRepositoryMock, hashProvider);
    const createUserService = new CreateUserService(usersRepositoryMock, hashProvider);

    await createUserService.execute({ name: "Bob Don", email: "don@bob.com", password: "abc" });

    const response = await authenticateUserService.execute({ email: "don@bob.com", password: "abc" });

    expect(response).toHaveProperty("token");
  });

});
