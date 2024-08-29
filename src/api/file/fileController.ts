import { FileService } from "@/api/file/fileService";
import { asyncHandler } from "@/middleware/asyncMiddleware";
import { ApiError } from "@/utils/ApiError";
import { ApiSuccess } from "@/utils/ApiSuccess";
import type { NextFunction, Request, Response } from "express";

/**
 * Analyze MP3 File Controller Function
 *
 * @type {*}
 */
export const analyzeMP3File = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log([req.file?.filename, req.file?.path, req.file?.originalname, req.file?.mimetype]);
    const fileService = new FileService(req.file);
    const frameCount = await fileService.countFrames();
    // Return json with success message
    res.status(200).json(
      new ApiSuccess<{ frameCount: number }>(
        {
          frameCount,
        },
        "Success!",
      ),
    );
  } catch (err) {
    // or Return 500 Internal Server Rrror
    console.error(err);
    throw new ApiError({}, 500, "Internal Server Error");
  }
});
