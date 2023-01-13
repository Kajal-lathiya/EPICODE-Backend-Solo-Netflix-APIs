import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON } = fs;

const datafolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const mediasJSONPath = join(datafolderPath, "medias.json");

export const getMedias = () => readJSON(mediasJSONPath);
export const writeMedias = (mediaArray) =>
  writeJSON(mediasJSONPath, mediaArray);
