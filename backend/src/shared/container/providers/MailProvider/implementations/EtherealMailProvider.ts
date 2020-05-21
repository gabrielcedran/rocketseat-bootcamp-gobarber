import nodemailer, { Transporter } from "nodemailer";
import IMailProvider from "../models/IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
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

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.transporter.sendMail({
      from: "Equipe GoBarber <equipe@gobarber.com.br>",
      to,
      subject: "Recuperaçāo de senha",
      text: body,
    });

    console.log("message sent: %s", message.messageId);
    console.log("Preview email: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
