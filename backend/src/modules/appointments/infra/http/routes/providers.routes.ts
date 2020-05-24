import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ProvidersController from "../controllers/ProvidersController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";

const router = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

router.get("/", providersController.index);

router.get(
  "/:id/month-availability",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
router.get(
  "/:id/day-availability",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default router;
