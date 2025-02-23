import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/upload-photo").post(
  verifyJWT,
  upload.single("photo"),
  uploadPhoto
)