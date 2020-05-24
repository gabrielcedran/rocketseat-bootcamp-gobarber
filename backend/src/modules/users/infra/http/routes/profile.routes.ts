import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ProfileController from "../controllers/ProfileController";

const router = Router();
const profileController = new ProfileController();
router.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string().when("password", { is: Joi.exist(), then: Joi.required() }),
      password: Joi.string(),
    },
  }),
  profileController.update,
);
router.get("/", profileController.show);

export default router;
