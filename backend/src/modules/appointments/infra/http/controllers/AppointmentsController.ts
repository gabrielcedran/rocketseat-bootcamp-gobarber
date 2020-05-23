import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, dateTime } = request.body;
    const userId = request.user.id;

    const parsedDateTime = parseISO(dateTime);

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
      providerId,
      userId,
      dateTime: parsedDateTime,
    });
    return response.json(appointment);
  }
}
