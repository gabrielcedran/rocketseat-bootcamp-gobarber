import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindProviderAppointmentsByMonthDTO from "../dtos/IFindProviderAppointmentsByMonthDTO";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(dateTime: Date): Promise<Appointment | undefined>;
  findProviderAppointmentsByMonth(data: IFindProviderAppointmentsByMonthDTO): Promise<Appointment[]>;
}
