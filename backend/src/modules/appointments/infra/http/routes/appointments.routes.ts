import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
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

appointmentsRouter.post(
  "/",
  celebrate({
    // same as "body": {...}
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      dateTime: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
