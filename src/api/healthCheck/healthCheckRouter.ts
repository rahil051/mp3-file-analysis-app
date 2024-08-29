import { healthCheck } from "@/api/healthCheck/healthCheckController";
import express, { type Router } from "express";

export const healthCheckRouter: Router = express.Router();

healthCheckRouter.get("/", healthCheck);
