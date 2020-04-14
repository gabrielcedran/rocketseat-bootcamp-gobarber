import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  dateTime: Date;
}

class CreateAppointmentService {
  public async execute({
    provider,
    dateTime,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDateTime = startOfHour(dateTime);

    if (await appointmentsRepository.findByDate(appointmentDateTime)) {
      throw Error("This timeslot is already booked.");
    }

    const appointment = appointmentsRepository.create({
      provider,
      dateTime: appointmentDateTime,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
