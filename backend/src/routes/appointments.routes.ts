import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find({
    relations: ["provider"],
  });
  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { providerId, dateTime } = request.body;

  const parsedDateTime = parseISO(dateTime);
  try {
    const appointment = await createAppointmentService.execute({
      providerId,
      dateTime: parsedDateTime,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(409).json({ message: err.message });
  }
});

export default appointmentsRouter;
