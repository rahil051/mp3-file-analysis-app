import { fileRouter } from "@/api/file/fileRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { env } from "@/config/envConfig";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

const logger = pino({ name: "server start" });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// TODO: Introduce Request level logging
// app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/file", fileRouter);

// TODO: Introduce System Wide Error handlers
// app.use(errorHandler());

// Listen to specified port in .env or default 5000
const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
