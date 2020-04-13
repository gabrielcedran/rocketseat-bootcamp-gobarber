import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentsRepository,
);

appointmentsRouter.get("/", (request, response) => {
  return response.json(appointmentsRepository.listAll());
});

appointmentsRouter.post("/", (request, response) => {
  const { provider, dateTime } = request.body;

  const parsedDateTime = parseISO(dateTime);
  try {
    const appointment = createAppointmentService.execute({
      provider,
      dateTime: parsedDateTime,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(409).json({ message: err.message });
  }
});

export default appointmentsRouter;
