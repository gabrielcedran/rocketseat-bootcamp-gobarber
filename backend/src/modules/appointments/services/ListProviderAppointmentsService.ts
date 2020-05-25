import { inject, injectable } from "tsyringe";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
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
  constructor(
    @inject("appointmentsRepository") private appointmentsRepository: IAppointmentsRepository,
    @inject("cacheProvider") private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ providerId, day, month, year }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.get<Appointment[]>(cacheKey);

    if (appointments) {
      return appointments;
    }

    appointments = await this.appointmentsRepository.findByProviderAndDay({ providerId, day, month, year });

    await this.cacheProvider.put(cacheKey, appointments);

    return appointments;
  }
}

export default ListProviderAppointmentsService;
