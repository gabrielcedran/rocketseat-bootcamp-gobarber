import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import CreateUserService from "./CreateUserService";

describe("Create User", () => {
  it("should be able to create a new user", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();
    const createUserService = new CreateUserService(usersRepositoryMock, hashProvider);

    const user = await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    expect(user).toHaveProperty("id");
    expect(user.password).toEqual("123");
  });

  it("should not be able to create a new user with existent email", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const hashProvider = new HashProviderMock();
    const createUserService = new CreateUserService(usersRepositoryMock, hashProvider);

    await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    expect(createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
