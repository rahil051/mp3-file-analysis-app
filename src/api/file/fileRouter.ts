import express, { type Router } from "express";
import { FileUploadMiddleware } from '@/middleware/fileUploadMiddleware';
import { FileController } from '@/api/file/fileController';

export const fileRouter: Router = express.Router();
const fileUploadMiddleware = new FileUploadMiddleware();

fileRouter.post(
  '/file-upload',
  fileUploadMiddleware.upload.single('file'),
  FileController.analyzeMP3File
);
