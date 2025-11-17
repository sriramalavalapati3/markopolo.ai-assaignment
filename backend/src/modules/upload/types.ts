import { z } from "zod";
import { ApplicationError } from "../application/applicationError";
import HttpStatusCodes from "../../utils/https";

export enum UploadErrorCode {
  BAD_REQUEST = "UPLOAD_BAD_REQUEST",
  NOT_FOUND = "UPLOAD_NOT_FOUND",
  IMAGE_NOT_FOUND = "IMAGE_NOT_FOUND",
}

export const UploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  mimeType: z.enum(["image/jpeg", "image/png"]),
  fileSize: z.number().max(3 * 1024 * 1024, "File size must be ≤ 3MB"),
  buffer: z.instanceof(Buffer, { message: "File buffer is required" }),
});

export type UploadImageInput = z.infer<typeof UploadSchema>;

export interface UploadCacheInput {
  id: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  fileUrl: string; // URL you send back
}

export class UploadBadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, UploadErrorCode.BAD_REQUEST, HttpStatusCodes.BAD_REQUEST);
  }
}

export class UploadNotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, UploadErrorCode.NOT_FOUND, HttpStatusCodes.NOT_FOUND);
  }
}

export class ImageNotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, UploadErrorCode.IMAGE_NOT_FOUND, HttpStatusCodes.NOT_FOUND);
  }
}
