import { MP3FileAnalyzer } from "@/utils/mp3FileAnaylzer";
import type { Express } from "express";

/**
 * FileService
 *
 * @export
 * @class FileService
 * @typedef {FileService}
 */
export class FileService {
  private static readonly ERROR = {
    INVALID_OR_NO_FILE: "INVALID_OR_NO_FILE",
  };
  private mp3FileAnalyzer: MP3FileAnalyzer;

  constructor(file: Express.Multer.File | undefined) {
    if (typeof file === "undefined" || !file) {
      throw new Error(FileService.ERROR.INVALID_OR_NO_FILE);
    }

    this.mp3FileAnalyzer = new MP3FileAnalyzer(file.filename, file.path);
  }

  async countFrames(): Promise<number> {
    return this.mp3FileAnalyzer.countFrames(true);
  }
}
