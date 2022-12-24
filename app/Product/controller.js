export async function upload(req, res, next) {
  const image = req.file;
  // const images = req.files;

  console.log(image);
  // console.log(images);
  res.status(200).json({ message: "ok" });
}
