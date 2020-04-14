import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();

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

export default usersRouter;
