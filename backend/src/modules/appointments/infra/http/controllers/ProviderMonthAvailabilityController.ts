import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

class ProviderMonthAvailability {

  public async index(request: Request, response: Response): Promise<Response> {
    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
    const providerId = request.params.id;
    const { month, year } = request.body;

    const availability = await listProviderMonthAvailability.execute({ providerId, month, year });

    return response.json(availability);
  }
}

export default ProviderMonthAvailability;
