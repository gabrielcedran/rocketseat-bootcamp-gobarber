import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  providerId: string;
  dateTime: Date;
}

class CreateAppointmentService {
  public async execute({
    providerId,
    dateTime,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDateTime = startOfHour(dateTime);

    if (await appointmentsRepository.findByDate(appointmentDateTime)) {
      throw Error("This timeslot is already booked.");
    }

    const appointment = appointmentsRepository.create({
      providerId,
      dateTime: appointmentDateTime,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
