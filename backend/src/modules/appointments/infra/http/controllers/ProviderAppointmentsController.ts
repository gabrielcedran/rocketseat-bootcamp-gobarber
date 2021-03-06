import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const { day, month, year } = request.query;
    const providerId = request.user.id;

    // parseIso(date) - from date-nfs

    const appointments = await listProviderAppointments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
