import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import CreateUserService from "./CreateUserService";
import ApplicationError from "@shared/errors/ApplicationError";

describe("Create User", () => {
  it("should be able to create a new user", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const createUserService = new CreateUserService(usersRepositoryMock);

    const user = await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    expect(user).toHaveProperty("id");
    expect(user.password).not.toEqual("123");
  });

  it("should not be able to create a new user with existent email", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const createUserService = new CreateUserService(usersRepositoryMock);

    await createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" });

    expect(createUserService.execute({ name: "Mary", email: "don@bob.com", password: "123" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
