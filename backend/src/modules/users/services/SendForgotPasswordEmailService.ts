import { inject, injectable } from "tsyringe";
import path from "path";
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

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, "..", "templates", "forgot_password.hbs");
    const baseUrl = process.env.APP_WEB_URL;
    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[GoBarber] Recuperaçāo de senha",
      templateContent: {
        file: forgotPasswordTemplate,
        variables: { name: user.name, link: `${baseUrl}/reset_password?token=${token}` },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
