import { container } from "tsyringe";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";
import MailProviderMock from "./MailProvider/mock/MailProviderMock";

container.registerSingleton<IStorageProvider>("storageProvider", DiskStorageProvider);
container.registerSingleton<IMailProvider>("mailProvider", MailProviderMock);
