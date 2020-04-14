import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider, dateTime } = request.body;

  const parsedDateTime = parseISO(dateTime);
  try {
    const appointment = await createAppointmentService.execute({
      provider,
      dateTime: parsedDateTime,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(409).json({ message: err.message });
  }
});

export default appointmentsRouter;
