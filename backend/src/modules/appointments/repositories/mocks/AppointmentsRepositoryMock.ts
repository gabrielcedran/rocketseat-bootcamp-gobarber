import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear } from "date-fns";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IFindProviderAppointmentsByMonthDTO from "@modules/appointments/dtos/IFindProviderAppointmentsByMonthDTO";

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

  public async findProviderAppointmentsByMonth({
    providerId,
    month,
    year,
  }: IFindProviderAppointmentsByMonthDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getMonth(appointment.dateTime) + 1 === month &&
        getYear(appointment.dateTime) === year,
    );
  }
}

export default AppointmentsRepository;
