import {config} from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import { mainRouter } from "./router.js";
const PORT = process.env.PORT || 8008;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/', mainRouter);




app.listen(PORT, () => console.log(`Server running in port ${PORT} `));  