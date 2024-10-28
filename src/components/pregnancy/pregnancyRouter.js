import { Router } from "express";
import { measurementRouter } from "./measurementRouter.js";
import { appointmentRouter } from "./appointmentsRouter.js";

export const pregnancyRouter = Router();

pregnancyRouter.use('/records', measurementRouter);
pregnancyRouter.use('/appointments',appointmentRouter );