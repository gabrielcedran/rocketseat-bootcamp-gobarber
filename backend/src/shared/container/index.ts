// DI library config
import { container } from "tsyringe";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IAppointmentsRepository>("appointmentsRepository", AppointmentsRepository);
container.registerSingleton<IUsersRepository>("usersRepository", UsersRepository);
