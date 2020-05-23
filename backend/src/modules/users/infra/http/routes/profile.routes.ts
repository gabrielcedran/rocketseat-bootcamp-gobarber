import { Router } from "express";
import enforceAuthentication from "../middlewares/enforceAuthentication";
import ProfileController from "../controllers/ProfileController";

const router = Router();
const profileController = new ProfileController();
router.put("/", enforceAuthentication, profileController.update);
router.get("/", enforceAuthentication, profileController.show);

export default router;
