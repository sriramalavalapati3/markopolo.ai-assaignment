import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../../../utils/https.js";
import UploadService from "./upload-service.js";

export default class UploadController {
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ message: "Image file is required" });
      }

      const payload = {
        fileName: req.file.originalname,
        mimeType: req.file.mimetype as "image/jpeg" | "image/png",
        fileSize: req.file.size,
        buffer: req.file.buffer,
      };

      const uploaded = await UploadService.uploadImage(payload);

      res.status(HttpStatusCodes.CREATED).json({
        data: uploaded,
        message: "Image uploaded successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await UploadService.deleteImage(id as string);

      res.status(HttpStatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
