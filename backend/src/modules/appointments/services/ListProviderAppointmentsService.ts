import { inject, injectable } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(@inject("appointmentsRepository") private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ providerId, day, month, year }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findByProviderAndDay({ providerId, day, month, year });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
