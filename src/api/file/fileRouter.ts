import { FileController } from "@/api/file/fileController";
import { FileUploadMiddleware } from "@/middleware/fileUploadMiddleware";
import express, { type Router } from "express";

export const fileRouter: Router = express.Router();
const fileUploadMiddleware = new FileUploadMiddleware();

fileRouter.post("/file-upload", fileUploadMiddleware.upload.single("file"), FileController.analyzeMP3File);
