import { ApiError } from "@/types/interfaces/interfaces.common";
import { Request, Response, NextFunction } from "express";

/**
 * Handles error responses from throw errors
 *
 * @param {ApiError} error
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 */
export const errorResponse = (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.statusCode).json({
    success: false,
    data: error.data,
    message: error.message,
  });
};