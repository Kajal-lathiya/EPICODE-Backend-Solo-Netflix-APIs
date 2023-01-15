import request from "request";
import fs from "fs-extra";
import { join } from "path";
import { pipeline } from "stream"; // CORE MODULE

const url = "https://skimdb.npmjs.com/registry/_changes?include_docs=true";

// const source = request.get(url); // READABLE STREAM
// const destination = process.stdout //WRITABLE STREAM (Treminal) */
const source = fs.createReadStream(join(process.cwd(), "./stream-example/data.json"))
const destination = fs.createWriteStream(
  join(process.cwd(), "./stream-example/npm.json")
);
pipeline(source, destination, (err) => {
  if (err) console.log(err);
  else console.log("STREAM ENDED SUCCESFULLY!");
});
