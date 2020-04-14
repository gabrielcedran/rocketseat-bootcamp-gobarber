import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(dateTime: Date): Promise<Appointment | null> {
    const appointmentFound = await this.findOne({
      where: { dateTime },
    });
    return appointmentFound || null; // it is almost a ternary -> should foundAppoitnment be undefined, returns null
  }
}

export default AppointmentsRepository;
