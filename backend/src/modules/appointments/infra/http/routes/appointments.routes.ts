import { Router } from "express";

import AppointmentsController from "@modules/appointments/infra/http/controllers/AppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
// appointmentsRouter.get("/", async (request, response) => {

//   const appointments = await appointmentsRepository.find({
//     relations: ["provider"],
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
