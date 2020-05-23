import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProvidersService from "@modules/appointments/services/ListProvidersService";

class ProvidersController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listProvidersService = container.resolve(ListProvidersService);

    const userId = request.user.id;

    const providers = await listProvidersService.execute({ userId });

    return response.json(providers);
  }
}

export default ProvidersController;
