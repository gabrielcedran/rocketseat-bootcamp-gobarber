import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  try {
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    return response.json({ user, token });
  } catch (err) {
    return response.status(401).json({ message: err.message });
  }
});

export default sessionsRouter;
