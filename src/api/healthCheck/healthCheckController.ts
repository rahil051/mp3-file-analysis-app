import { asyncHandler } from "@/middleware/asyncMiddleware";
import { ApiSuccess } from "@/utils/ApiSuccess";
import type { NextFunction, Request, Response } from "express";

export const healthCheck = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {});
