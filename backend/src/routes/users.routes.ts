import { Router } from "express";
import multer from "multer";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import enforceAuthentication from "../middlewares/enforceAuthentication";
import uploadConfig from "../config/upload";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const createUserService = new CreateUserService();
    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    });

    delete createdUser.password;
    return response.json(createdUser);
  } catch (err) {
    return response.status(409).json({ message: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  enforceAuthentication,
  upload.single("avatar"),
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const {
        user: { id: userId },
        file: { filename: avatarFilename },
      } = request;

      const updatedUser = await updateUserAvatarService.execute({
        userId,
        avatarFilename,
      });

      return response.json(updatedUser);
    } catch (err) {
      return response.status(500).json({ message: err.message });
    }
  },
);

export default usersRouter;
