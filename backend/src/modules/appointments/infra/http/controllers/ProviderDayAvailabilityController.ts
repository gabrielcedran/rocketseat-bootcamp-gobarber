import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAvailability from "@modules/appointments/services/ListProviderDayAvailability";

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderDayAvailability = container.resolve(ListProviderDayAvailability);
    const providerId = request.params.id;
    const { day, month, year } = request.query;

    const availability = await listProviderDayAvailability.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
