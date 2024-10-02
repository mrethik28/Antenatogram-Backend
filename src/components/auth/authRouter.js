import { Router } from "express";
import { AuthServices } from "./authServices.js";

export const authRouter = Router();

authRouter.post('/signup', AuthServices.signup);
authRouter.post('/signin', AuthServices.signin);
authRouter.post('/logout', AuthServices.logout);
authRouter.post('/refresh', AuthServices.refresh);