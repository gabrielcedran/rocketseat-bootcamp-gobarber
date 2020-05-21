import { container } from "tsyringe";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>("storageProvider", DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>("mailTemplateProvider", HandlebarsMailTemplateProvider);
container.registerInstance<IMailProvider>("mailProvider", container.resolve(EtherealMailProvider));
