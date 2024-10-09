import {config} from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { mainRouter } from "./router.js";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', mainRouter);




app.listen(PORT, () => console.log(`Server running in port ${PORT} `));  