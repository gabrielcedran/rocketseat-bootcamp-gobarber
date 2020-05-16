import { Router } from "express";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {

  const usersRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  return response.json({ user, token });
});

export default sessionsRouter;
