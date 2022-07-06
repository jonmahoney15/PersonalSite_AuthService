import { createHttpTerminator } from "http-terminator";
import { app } from "./App";
import { config } from "./Config";
import { handle } from "./Util/Error";
import { logger } from "./Util/Logger";

process.on("unhandledRejection", err => {
  throw err;
});

process.on("uncaughtException", err => {
  handle(err);
});

const server = app.listen(config.port, () => {
  logger.info(`Started server on: ${config.port} in ${config.env} mode`);
});

const httpTerminator = createHttpTerminator({ server });

const shutdownSignals = ["SIGTERM", "SIGINT"];

shutdownSignals.forEach(signal =>
  process.on(signal, async () => {
    logger.info(`${signal} received, closing gracefully ...`);
    await httpTerminator.terminate();
  })
);
