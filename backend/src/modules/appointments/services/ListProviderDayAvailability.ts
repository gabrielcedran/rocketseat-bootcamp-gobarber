import { injectable, inject } from "tsyringe";
import { getHours, isAfter } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailability {
  constructor(@inject("appointmentsRepository") private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ providerId, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findByProviderAndDay({ providerId, day, month, year });

    const startHour = 8;
    const hoursOfTheDay = Array.from({ length: 10 }, (value, index) => index + startHour);

    // Date.now() helps to mock dates when testing
    const currentDate = new Date(Date.now());

    const availability = hoursOfTheDay.map(hour => {
      const appointmentFound = appointments.find(appointment => getHours(appointment.dateTime) === hour);
      const appointmentHour = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !appointmentFound && isAfter(appointmentHour, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailability;
