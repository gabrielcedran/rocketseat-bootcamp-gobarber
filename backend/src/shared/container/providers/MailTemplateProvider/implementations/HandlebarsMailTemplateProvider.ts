import handlebars from "handlebars";
import fs from "fs";
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, file, variables }: IParseMailTemplateDTO): Promise<string> {
    const mailContent = template || (await fs.promises.readFile(file, { encoding: "utf-8" }));
    const parseTemplate = handlebars.compile(mailContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
