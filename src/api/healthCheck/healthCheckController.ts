import { asyncHandler } from "@/middleware/asyncMiddleware";
import { ApiSuccess } from "@/utils/ApiSuccess";
import type { NextFunction, Request, Response } from "express";

export const healthCheck = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(new ApiSuccess([], "Server is up and running! All Good!"));
});
