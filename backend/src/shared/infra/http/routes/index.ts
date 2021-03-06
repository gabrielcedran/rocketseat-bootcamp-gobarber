import { Router } from "express";
import { errors } from "celebrate";
import "express-async-errors";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import providersRouter from "@modules/appointments/infra/http/routes/providers.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import enforceAuthentication from "@modules/users/infra/http/middlewares/enforceAuthentication";
import globalExceptionHandler from "../middlewares/globalExceptionHandler";

const routes = Router();

// enforceAuthentication is a middlewate (or interceptor in java), which is executed before the
// functions handling the requests. Can be applied globably like the globalExceptionHandler
// or before any endpoint with a given path or to an specific endpoint
// more than one middleware can be applied example, middlewareA, middlewareB, controller
routes.use("/appointments", enforceAuthentication, appointmentsRouter);
routes.use("/providers", enforceAuthentication, providersRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", enforceAuthentication, profileRouter);
routes.use(errors());
// Global exception handlings must be added after all routes and the function must receive 4 parameters.
routes.use(globalExceptionHandler);

export default routes;
