import { ApplicationRouter } from "../../application/applicationRouter.js";
import UploadController from "./upload-controller.js";
import upload from "../../../middlewares/multer.js";

export class UploadRouter extends ApplicationRouter {

  configure(): void {
    const ctrl = new UploadController();
    this.router.post('/upload', upload, ctrl.uploadImage);
    this.router.delete('/delete/:id', ctrl.deleteImage);
    this.router.get('all', ctrl.getAllImages);
  }
}