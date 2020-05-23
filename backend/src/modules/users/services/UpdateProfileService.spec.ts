import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";
import UpdateProfileService from "./UpdateProfileService";

let usersRepository: UsersRepositoryMock;
let hashProvider: HashProviderMock;
let updateProfileService: UpdateProfileService;

describe("UpdateProfileService", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    hashProvider = new HashProviderMock();
    updateProfileService = new UpdateProfileService(usersRepository, hashProvider);
  });

  it("should be able to update the profile without updating the password", async () => {
    const user = await usersRepository.create({ name: "Raquel", email: "mary@don.bob", password: "123456" });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: "Mary",
      email: "raquel@bob.don",
    });

    expect(updatedUser.name).toBe("Mary");
    expect(updatedUser.email).toBe("raquel@bob.don");
  });

  it("should not be able to update the email to another already assigned to another user", async () => {
    await usersRepository.create({ name: "Gabriel", email: "gabriel@don.bob", password: "123456" });
    const user = await usersRepository.create({ name: "Raquel", email: "mary@don.bob", password: "123456" });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Mary",
        email: "gabriel@don.bob",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should be able to update the password", async () => {
    const user = await usersRepository.create({ name: "Raquel", email: "mary@don.bob", password: "123456" });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: "Raquel",
      email: "mary@don.bob",
      password: "123123",
      oldPassword: "123456",
    });

    expect(updatedUser.password).not.toBe("123456");
  });

  it("should not be able to update the password without the old password", async () => {
    const user = await usersRepository.create({ name: "Raquel", email: "mary@don.bob", password: "123456" });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Raquel",
        email: "mary@don.bob",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to update the password when the old password is incorrect", async () => {
    const user = await usersRepository.create({ name: "Raquel", email: "mary@don.bob", password: "123456" });

    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: "Raquel",
        email: "mary@don.bob",
        oldPassword: "654321",
        password: "111222",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
