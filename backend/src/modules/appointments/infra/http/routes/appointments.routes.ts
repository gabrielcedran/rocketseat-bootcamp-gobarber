import { Router } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

const appointmentsRouter = Router();

// appointmentsRouter.get("/", async (request, response) => {

//   const appointments = await appointmentsRepository.find({
//     relations: ["provider"],
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {

  const { providerId, dateTime } = request.body;

  const parsedDateTime = parseISO(dateTime);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    providerId,
    dateTime: parsedDateTime,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
