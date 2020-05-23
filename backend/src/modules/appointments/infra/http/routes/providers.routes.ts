import { Router } from "express";
import ProvidersController from "../controllers/ProvidersController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";

const router = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

router.get("/", providersController.index);

router.get("/:id/month-availability", providerMonthAvailabilityController.index);
router.get("/:id/day-availability", providerDayAvailabilityController.index);

export default router;
