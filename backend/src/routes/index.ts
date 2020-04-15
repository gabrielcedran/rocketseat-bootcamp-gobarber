import { Router } from "express";
import "express-async-errors";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import enforceAuthentication from "../middlewares/enforceAuthentication";
import globalExceptionHandler from "../middlewares/globalExceptionHandler";

const routes = Router();

routes.use("/appointments", enforceAuthentication, appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
// Global exception handlings must be added after all routes and the function must receive 4 parameters.
routes.use(globalExceptionHandler);

export default routes;
