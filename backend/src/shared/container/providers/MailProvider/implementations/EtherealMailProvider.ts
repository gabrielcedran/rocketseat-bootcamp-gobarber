import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(@inject("mailTemplateProvider") private mailTemplateProvider: IMailTemplateProvider) {
    nodemailer.createTestAccount().then(account => {
      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail({ to, from, subject, templateContent }: ISendMailDTO): Promise<void> {
    const message = await this.transporter.sendMail({
      from: {
        name: from?.name || "Equipe Go Barber",
        address: from?.email || "equipe@gobarber.com.br"
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateContent),
    });

    console.log("message sent: %s", message.messageId);
    console.log("Preview email: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
