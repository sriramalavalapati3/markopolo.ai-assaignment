import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ImageMemoryStore } from "./imageMemoryStorage";
import { UploadImageInput, ImageNotFoundError } from "../types";

export default class UploadWriter {
  static async uploadImage(input: UploadImageInput) {
    const id = crypto.randomUUID();

    const uniqueName = `${Date.now()}-${input.fileName}`;
    const filePath = path.join("uploads", uniqueName);

    // ensure uploads folder exists
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

    fs.writeFileSync(filePath, input.buffer);

    const fileUrl = `/uploads/${uniqueName}`;

    const newImage = {
      id,
      fileName: input.fileName,
      mimeType: input.mimeType,
      fileSize: input.fileSize,
      fileUrl,
    };

    ImageMemoryStore.add(newImage);

    return newImage;
  }

  static async deleteImage(id: string) {
    const img = ImageMemoryStore.getById(id);

    if (!img) throw new ImageNotFoundError("Image not found");

    const actualPath = path.join("uploads", path.basename(img.fileUrl));
    if (fs.existsSync(actualPath)) {
      fs.unlinkSync(actualPath);
    }

    ImageMemoryStore.delete(id);
  }

  // helper
  static async exists(id: string) {
    return ImageMemoryStore.getById(id) !== null;
  }
}
