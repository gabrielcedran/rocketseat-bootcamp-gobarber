import { Router } from "express";
import "express-async-errors";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import enforceAuthentication from "@modules/users/infra/http/middlewares/enforceAuthentication";
import globalExceptionHandler from "../middlewares/globalExceptionHandler";

const routes = Router();

routes.use("/appointments", enforceAuthentication, appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
// Global exception handlings must be added after all routes and the function must receive 4 parameters.
routes.use(globalExceptionHandler);

export default routes;
