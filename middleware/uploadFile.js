import crypto from "crypto";
import multer from "multer";

export const TYPE_IMAGE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    const uuid = crypto.randomUUID();
    const ext = TYPE_IMAGE[file.mimetype];
    cb(null, `${uuid}.${ext}`);
  },
});

const fileFilter = async (req, file, cb) => {
  const acceptMime = Object.keys(TYPE_IMAGE);

  if (acceptMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: "file not accepted" }, false);
  }
};

const maxSize = 1 * 1024 * 1024; //1MB

// single file
const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single("image");

// multiple file
const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).array("images", 3);

export { uploadFile, uploadFiles };
