import { injectable, inject } from "tsyringe";
import { getDaysInMonth, getDate, isAfter, endOfDay } from "date-fns";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(@inject("appointmentsRepository") private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ providerId, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findProviderAppointmentsByMonth({ providerId, month, year });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const daysOfTheMonth = Array.from({ length: numberOfDaysInMonth }, (value, index) => index + 1);

    const availabilityPerDay = daysOfTheMonth.map(day => {
      const compareDate = endOfDay(new Date(year, month - 1, day));

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.dateTime) === day;
      });

      return {
        day,
        available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    return availabilityPerDay;
  }
}

export default ListProviderMonthAvailabilityService;
