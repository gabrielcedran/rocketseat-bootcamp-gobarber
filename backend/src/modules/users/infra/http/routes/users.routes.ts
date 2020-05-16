import { Router } from "express";
import multer from "multer";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import enforceAuthentication from "@modules/users/infra/http/middlewares/enforceAuthentication";
import uploadConfig from "@config/upload";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const usersRepository = new UsersRepository();

  const { name, email, password } = request.body;

  const createUserService = new CreateUserService(usersRepository);
  const createdUser = await createUserService.execute({
    name,
    email,
    password,
  });

  delete createdUser.password;
  return response.json(createdUser);
});

usersRouter.patch("/avatar", enforceAuthentication, upload.single("avatar"), async (request, response) => {
  const usersRepository = new UsersRepository();

  const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

  const {
    user: { id: userId },
    file: { filename: avatarFilename },
  } = request;

  const updatedUser = await updateUserAvatarService.execute({
    userId,
    avatarFilename,
  });

  return response.json(updatedUser);
});

export default usersRouter;