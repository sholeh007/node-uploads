import { fileTypeFromFile } from "file-type";
import { unlink } from "fs/promises";
import isSvg from "is-svg";
import { TYPE_IMAGE } from "./uploadFile.js";

export async function validateFile(req, res, next) {
  // single file image
  const file = req.file;
  const acceptMime = Object.keys(TYPE_IMAGE);
  const fileType = await fileTypeFromFile(file.path);

  if (!acceptMime.includes(fileType?.mime) || isSvg(file.path)) {
    await unlink(file.path);
    return res.status(500).json({ message: "file is not allowed" });
  }

  next();

  // multiple file image
  // const files = req.files;
  // const acceptMime = Object.keys(TYPE_IMAGE);
  // const listPathImg = [];
  // let isFileRejected = false;

  // for (const file of files) {
  //   const fileType = await fileTypeFromFile(file.path);
  //   listPathImg.push(file.path);

  //   if (!acceptMime.includes(fileType?.mime) || isSvg(file.path)) {
  //     isFileRejected = true;
  //     await unlink(file.path);
  //   }
  // }

  // if (isFileRejected) {
  //   for (const pathImg of listPathImg) {
  //     const isExist = await checkFile(pathImg);
  //     if (isExist) {
  //       await unlink(pathImg);
  //     }
  //   }
  //   return res.status(500).json({ message: "file is not allowed" });
  // }

  // next();
}
