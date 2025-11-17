// in-memory DB substitute
export class ImageMemoryStore {
  private static images: Map<
    string,
    {
      id: string;
      fileName: string;
      mimeType: string;
      fileSize: number;
      fileUrl: string;
    }
  > = new Map();

  static add(img: {
    id: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    fileUrl: string;
  }) {
    this.images.set(img.id, img);
  }

  static getById(id: string) {
    return this.images.get(id) || null;
  }

  static delete(id: string) {
    return this.images.delete(id);
  }

  static getAll() {
    return Array.from(this.images.values());
  }
}
