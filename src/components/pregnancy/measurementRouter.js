import { Router } from "express";
import { measurementServices } from "./measurementServices.js";

export const measurementRouter = Router();

measurementRouter.post('/update', measurementServices.update);
