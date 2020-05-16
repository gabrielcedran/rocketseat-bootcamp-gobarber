import { Router } from "express";
import { parseISO } from "date-fns";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import AppointmentsRepository from "../../typeorm/repositories/AppointmentsRepository";

const appointmentsRouter = Router();

// appointmentsRouter.get("/", async (request, response) => {

//   const appointments = await appointmentsRepository.find({
//     relations: ["provider"],
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const { providerId, dateTime } = request.body;

  const parsedDateTime = parseISO(dateTime);

  const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointmentService.execute({
    providerId,
    dateTime: parsedDateTime,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
