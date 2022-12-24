import express from "express";
import { uploadFile } from "../../middleware/uploadFile.js";
import { validateFile } from "../../middleware/validateFile.js";
import { upload } from "./controller.js";

const router = express.Router();

router.post("/upload", uploadFile, validateFile, upload);

export default router;
