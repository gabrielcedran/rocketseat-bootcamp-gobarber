import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import UserTokensRepositoryMock from "../repositories/mock/UserTokensRepositoryMock";
import ResetPasswordService from "./ResetPasswordService";
import BCryptHashProvider from "../providers/HashProvider/implementations/BCryptHashProvider";
import HashProviderMock from "../providers/HashProvider/mock/HashProviderMock";

let usersRepository: UsersRepositoryMock;
let userTokensRepository: UserTokensRepositoryMock;
let hashProvider: BCryptHashProvider;
let resetPasswordService: ResetPasswordService;

describe("ResetPasswordService", () => {

  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    userTokensRepository = new UserTokensRepositoryMock();
    hashProvider = new HashProviderMock();

    resetPasswordService = new ResetPasswordService(usersRepository, userTokensRepository, hashProvider);
  });
  it("should be able to reset the password", async () => {
    const generateHash = jest.spyOn(hashProvider, "generateHash");

    const user = await usersRepository.create({
      name: "Mary",
      email: "don@bob.com",
      password: "123456",
    });
    const userToken = await userTokensRepository.generate(user.id);

    await resetPasswordService.execute({ token: userToken.token, password: "123123" });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.password).toBe("123123");
    expect(generateHash).toHaveBeenCalledWith("123123");
  });

  it("should return error when token non existent", async () => {
    await expect(resetPasswordService.execute({ token: "123", password: "abc" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });

  it("should return error when user non existent", async () => {
    const { token } = await userTokensRepository.generate("invalid");

    await expect(resetPasswordService.execute({ token, password: "abc" })).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should allow reset password with expired token", async () => {
    const user = await usersRepository.create({
      name: "Mary",
      email: "don@bob.com",
      password: "123456",
    });
    const { token } = await userTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(resetPasswordService.execute({ token, password: "abc" })).rejects.toBeInstanceOf(ApplicationError);
  });
});
