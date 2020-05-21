// DI library config
import { container } from "tsyringe";

import "@modules/users/providers/index";
import "./providers/index";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";

container.registerSingleton<IAppointmentsRepository>("appointmentsRepository", AppointmentsRepository);
container.registerSingleton<IUsersRepository>("usersRepository", UsersRepository);
container.registerSingleton<IUserTokensRepository>("userTokensRepository", UserTokensRepository);
