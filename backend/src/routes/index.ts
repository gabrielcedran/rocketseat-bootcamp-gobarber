import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import enforceAuthentication from "../middlewares/enforceAuthentication";

const routes = Router();

routes.use("/appointments", enforceAuthentication, appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
