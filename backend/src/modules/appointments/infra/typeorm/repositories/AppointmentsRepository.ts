import { getRepository, Repository, Raw } from "typeorm";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import Appointment from "../entities/Appointment";
import IFindProviderAppointmentsByMonthDTO from "@modules/appointments/dtos/IFindProviderAppointmentsByMonthDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(dateTime: Date): Promise<Appointment | undefined> {
    const appointmentFound = await this.ormRepository.findOne({
      where: { dateTime },
    });
    return appointmentFound;
  }

  public async create({ providerId, dateTime }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      providerId,
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
}

export default AppointmentsRepository;
