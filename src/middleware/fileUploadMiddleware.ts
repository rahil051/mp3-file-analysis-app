import path from "node:path";
import type e from "express";
import multer from "multer";

export class FileUploadMiddleware {
  private _upload: multer.Multer;

  get upload() {
    return this._upload;
  }

  /**
   * set storage for file
   *
   * @private
   * @type {*}
   */
  private storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `${__dirname}/../../tmp/uploads`);
    },
    filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`),
  });

  /**
   * set mp3 filter for file
   *
   * @param {e.Request} req
   * @param {Express.Multer.File} file
   * @param {multer.FileFilterCallback} callback
   */
  private fileFilter = (req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".mp3") {
      callback(null, true);
    } else {
      callback(new Error("Only MP3 files are allowed!"));
    }
  };

  constructor() {
    this._upload = multer({ storage: this.storage, fileFilter: this.fileFilter });
  }
}
