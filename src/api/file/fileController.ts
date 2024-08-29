import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "@/utils/ApiSuccess";
import { asyncHandler } from "@/middleware/asyncMiddleware";
import { FileService } from "@/api/file/fileService";
import { ApiError } from "@/utils/ApiError";

/**
 * FileController
 *
 * @export
 * @class FileController
 * @typedef {FileController}
 */
export class FileController {
  /**
   * /POST Request: Analyze MP3 File
   *
   * @static
   * @type {*}
   */
  static analyzeMP3File = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log([
          req.file?.filename,
          req.file?.path,
          req.file?.originalname,
          req.file?.mimetype
        ])
        const fileService = new FileService(req.file?.filename);
        const frameCount = await fileService.countFrames();
        // Return json with success message
        res.status(200).json(new ApiSuccess<{ frameCount: number }>({
          frameCount
        }, "Success!"));
      } catch (err) {
        // or Return 500 Internal Server Rrror
        console.error(err);
        res.status(500).json(new ApiError([], 500, 'Internal Server Error'));
      }
    },
  );
}
