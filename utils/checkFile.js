import { access } from "node:fs/promises";

export async function checkFile(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
