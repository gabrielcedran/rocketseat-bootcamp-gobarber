import { inject, injectable } from "tsyringe";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ApplicationError from "@shared/errors/ApplicationError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("usersRepository") private usersRepository: IUsersRepository,
    @inject("mailProvider") private mailProvider: IMailProvider,
    @inject("userTokensRepository") private userTokensRepository: IUserTokensRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ApplicationError("User does not exist.");
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, "");
  }
}

export default SendForgotPasswordEmailService;
