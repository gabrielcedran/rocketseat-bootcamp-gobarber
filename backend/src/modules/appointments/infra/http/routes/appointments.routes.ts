import { Router } from "express";
import enforceAuthentication from "@modules/users/infra/http/middlewares/enforceAuthentication";
import AppointmentsController from "@modules/appointments/infra/http/controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
// appointmentsRouter.get("/", async (request, response) => {

//   const appointments = await appointmentsRepository.find({
//     relations: ["provider"],
//   });
//   return response.json(appointments);
// });

appointmentsRouter.post("/", appointmentsController.create);
appointmentsRouter.get("/me", enforceAuthentication, providerAppointmentsController.index);

export default appointmentsRouter;
