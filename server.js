import cors from "cors";
import express from "express";
import multer from "multer";
import productRoutes from "./app/Product/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      err.message = "max file upload is 3";
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      err.message = "max file size is 1MB";
    }
    next(err.MulterError);
  }
  res.status(500).json(err);
});

app.listen(3000, () => console.log("server running on port 3000"));
