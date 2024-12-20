import { Router } from "express";
import { measurementServices } from "./measurementServices.js";

export const measurementsRouter = Router();

measurementsRouter.get('/fetch', measurementServices.fetch);
measurementsRouter.post('/add', measurementServices.add);
measurementsRouter.post('/update', measurementServices.update);
measurementsRouter.post('/remove', measurementServices.remove);