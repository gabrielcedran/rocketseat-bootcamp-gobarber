import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import appointmentsRouter from "../routes/appointments.routes";

interface RequestDTO {
  provider: string;
  dateTime: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, dateTime }: RequestDTO): Appointment {
    const appointmentDateTime = startOfHour(dateTime);

    if (this.appointmentsRepository.findByDate(appointmentDateTime)) {
      throw Error("This timeslot is already booked.");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      dateTime: appointmentDateTime,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
