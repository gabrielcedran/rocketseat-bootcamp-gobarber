import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// appointmentsRouter.get("/", async (request, response) => {

//   const appointments = await appointmentsRepository.find({
//     relations: ["provider"],
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
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
