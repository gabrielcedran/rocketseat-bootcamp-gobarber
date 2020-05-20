import MailProviderMock from "@shared/container/providers/MailProvider/mock/MailProviderMock";
import ApplicationError from "@shared/errors/ApplicationError";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import User from "../infra/typeorm/entities/User";
import UserTokensRepositoryMock from "../repositories/mock/UserTokensRepositoryMock";

let mailProvider: MailProviderMock;
let usersRepository: UsersRepositoryMock;
let userTokensRepository: UserTokensRepositoryMock;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    mailProvider = new MailProviderMock();
    usersRepository = new UsersRepositoryMock();
    userTokensRepository = new UserTokensRepositoryMock();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(usersRepository, mailProvider, userTokensRepository);
  });

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepository.create({ name: "Mary", email: "don@bob.com", password: "123456" });

    await sendForgotPasswordEmail.execute({ email: "don@bob.com" });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existent user passowrd", async () => {
    await expect(sendForgotPasswordEmail.execute({ email: "don@bob.com" })).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(userTokensRepository, "generate");

    const user = await usersRepository.create({ name: "Mary", email: "bob@don.com", password: "123456" });

    await sendForgotPasswordEmail.execute({ email: "bob@don.com" });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  });
});
