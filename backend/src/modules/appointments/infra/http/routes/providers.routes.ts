import { Router } from "express";
import ProvidersController from "../controllers/ProvidersController";

const router = Router();

const providersController = new ProvidersController();

router.get("/", providersController.index);

export default router;
