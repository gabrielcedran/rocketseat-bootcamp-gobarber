import { uuid } from "uuidv4";
import { isEqual } from "date-fns";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(dateTime: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.dateTime, dateTime));

    return findAppointment;
  }

  public async create({ providerId, dateTime }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), providerId, dateTime });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
