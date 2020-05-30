import { getRepository, Repository, Raw } from "typeorm";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import IFindProviderAppointmentsByMonthDTO from "@modules/appointments/dtos/IFindProviderAppointmentsByMonthDTO";
import IFindByProviderAndDay from "@modules/appointments/dtos/IFindByProviderAndDay";
import Appointment from "../entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(providerId: string, dateTime: Date): Promise<Appointment | undefined> {
    const appointmentFound = await this.ormRepository.findOne({
      where: { dateTime, providerId },
    });
    return appointmentFound;
  }

  public async create({ providerId, userId, dateTime }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      providerId,
      userId,
      dateTime,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findProviderAppointmentsByMonth({
    providerId,
    month,
    year,
  }: IFindProviderAppointmentsByMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");

    return this.ormRepository.find({
      where: {
        providerId,
        dateTime: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
      },
    });
  }

  public async findByProviderAndDay({ providerId, day, month, year }: IFindByProviderAndDay): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, "0");
    const parsedMonth = String(month).padStart(2, "0");
    return this.ormRepository.find({
      where: {
        providerId,
        dateTime: Raw(
          dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ["user"],
    });
  }
}

export default AppointmentsRepository;
