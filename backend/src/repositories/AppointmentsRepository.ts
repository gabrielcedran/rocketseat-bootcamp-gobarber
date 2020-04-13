import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

interface CreateAppointmentDTO {
  provider: string;

  dateTime: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public listAll(): Appointment[] {
    return this.appointments;
  }

  // Instead of receiving many parameters, receive just one object as parameter and destructure its attributes.
  // It is even possible to rename the attributes by using objAttributeName: newAttributeName.
  public create({ provider, dateTime }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, dateTime });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(dateTime: Date): Appointment | null {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(dateTime, appointment.dateTime),
    );
    return foundAppointment || null; // it is almost a ternary -> should foundAppoitnment be undefined, returns null
  }
}

export default AppointmentsRepository;
