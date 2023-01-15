import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const datafolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const publicFolderPath = join(process.cwd(), "./public/images");
const mediasJSONPath = join(datafolderPath, "medias.json");

export const getMedias = () => readJSON(mediasJSONPath);
export const writeMedias = (mediaArray) =>
  writeJSON(mediasJSONPath, mediaArray);

export const saveMediasImages = (fileName, contentAsBuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsBuffer);

export const getMediasJsonReadableStream = () => createReadStream(mediasJSONPath)

