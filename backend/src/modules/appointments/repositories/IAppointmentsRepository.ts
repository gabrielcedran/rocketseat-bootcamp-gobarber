import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindProviderAppointmentsByMonthDTO from "../dtos/IFindProviderAppointmentsByMonthDTO";
import IFindByProviderAndDay from "../dtos/IFindByProviderAndDay";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(dateTime: Date): Promise<Appointment | undefined>;
  findProviderAppointmentsByMonth(data: IFindProviderAppointmentsByMonthDTO): Promise<Appointment[]>;
  findByProviderAndDay(data: IFindByProviderAndDay): Promise<Appointment[]>;
}
