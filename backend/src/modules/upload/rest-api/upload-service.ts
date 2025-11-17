import UploadWriter from "../internal/upload-writer.js";
import {
  UploadBadRequestError,
  UploadNotFoundError,
  UploadSchema,
  UploadImageInput,
  UploadCacheInput,
} from "../types.js";

export default class UploadService {
  static async uploadImage(fileData: UploadImageInput) {
    const parsed = UploadSchema.safeParse(fileData);

    if (!parsed.success) {
      const msg = parsed.error.issues
        .map(
          (i) =>
            `{ Key: ${i.path.join(".")}, Code: ${i.code}, Message: ${i.message} }`
        )
        .join("; ");

      throw new UploadBadRequestError(msg);
    }

    const saved = await UploadWriter.uploadImage(fileData);

    const res: UploadCacheInput = {
      id: saved.id,
      fileName: saved.fileName,
      fileSize: saved.fileSize,
      mimeType: saved.mimeType,
      fileUrl: saved.fileUrl,
    };

    return res;
  }

  static async deleteImage(id: string) {
    const exists = await UploadWriter.exists(id);

    if (!exists) throw new UploadNotFoundError("Image not found");

    await UploadWriter.deleteImage(id);

    return { message: "Image deleted successfully", id };
  }

  static async getAllImages(){
    const images = await UploadWriter.getAllImages();
    return images;
  }
}
