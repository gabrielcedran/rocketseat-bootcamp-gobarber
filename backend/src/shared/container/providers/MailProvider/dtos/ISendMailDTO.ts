import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDTO";

interface IContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IContact;
  from?: IContact;
  subject: string;
  templateContent: IParseMailTemplateDTO;
}
