import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import pinoHttp from "pino-http";
import * as database from "./Database/Database";
import { errorMiddleware, notFoundMiddleware } from "./Util/Error";
import { logger } from "./Util/Logger";
import { Router } from "./Routes/Router";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

app.use("/", Router);

database.connect();

app.use([errorMiddleware, notFoundMiddleware]);

export { app };
