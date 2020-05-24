import { container } from "tsyringe";
import HandlebarsMailTemplateProvider from "./implementations/HandlebarsMailTemplateProvider";
import IMailTemplateProvider from "./models/IMailTemplateProvider";

const provider = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>("mailTemplateProvider", provider.handlebars);
