import { Router } from "express"
import { authRouter } from "./src/components/auth/authRouter.js";
import { createLog } from "./src/middleware/logger.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { pregnancyRouter } from "./src/components/pregnancy/pregnancyRouter.js";

export const mainRouter = Router();

mainRouter.use('/*', createLog);

mainRouter.use('/auth', authRouter);

mainRouter.use('/pregnancy', pregnancyRouter);

mainRouter.use(errorHandler);