import { startOfHour, isBefore, getHours } from "date-fns";
import { injectable, inject } from "tsyringe";
import ApplicationError from "@shared/errors/ApplicationError";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequestDTO {
  providerId: string;
  userId: string;
  dateTime: Date;
}

@injectable()
class CreateAppointmentService {
  // This hack declares the attribute directly from the constructor
  // (instead of declaring outside and attributing the value within the constructor)
  constructor(@inject("appointmentsRepository") private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ providerId, userId, dateTime }: IRequestDTO): Promise<Appointment> {
    const appointmentDateTime = startOfHour(dateTime);

    if (isBefore(appointmentDateTime, Date.now())) {
      throw new ApplicationError("Appointment cannot be booked in the past.");
    }

    if (getHours(appointmentDateTime) < 8 || getHours(appointmentDateTime) > 17) {
      throw new ApplicationError("Appointment cannot be booked outside working hours.");
    }

    if (userId === providerId) {
      throw new ApplicationError("User cannot be the provider at the same time");
    }

    if (await this.appointmentsRepository.findByDate(appointmentDateTime)) {
      throw new ApplicationError("This timeslot is already booked.", 409);
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      userId,
      dateTime: appointmentDateTime,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
