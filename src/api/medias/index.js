import express from "express";
import uniqid from "uniqid";
import { getMedias, writeMedias } from "../../lib/fs-tools.js";
import httpErrors from "http-errors";
import { checkMediaSchema, triggerBadRequest } from "./validators.js";
import multer from "multer";
const { NotFound } = httpErrors;

const mediasRouter = express.Router();

mediasRouter.post(
  "/",
  checkMediaSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      // create media
      const newMedia = {
        ...req.body,
        imdbID: uniqid(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const mediaArray = await getMedias();
      mediaArray.push(newMedia);
      await writeMedias(mediaArray);
      res.status(201).send({ media_id: newMedia.imdbID });
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  }
);

mediasRouter.get("/", async (req, res, next) => {
  try {
    // get media list
    const mediaArray = await getMedias();
    if (req.query && req.query.title) {
      const filteredMedias = mediaArray.filter(
        (media) => media.title === req.query.title
      );
      res.send(filteredMedias);
    } else {
      res.send(mediaArray);
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

mediasRouter.get("/:id", async (req, res, next) => {
  try {
    //get single media
    const mediaArray = await getMedias();
    const media = mediaArray.find((media) => media.imdbID === req.params.id);
    if (media) {
      res.send(media);
    } else {
      next(NotFound(`media id ${req.params.id} not found!`));
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

mediasRouter.post(
  "/:id/poster",
  multer().single("poster"),
  async (req, res, next) => {
    try {
      //Upload poster to single media
        const fileName = req.file.originalname;
    //   await saveMediasImages(fileName, req.file.buffer);
      const url = `http://localhost:3001/posters/${fileName}`;
      const medias = await getMedias();

      const index = medias.findIndex((media) => media.imdbID === req.params.id);
      if (index !== -1) {
        const oldMedia = medias[index];

        const updateMedia = {
          ...oldMedia,
          poster: url,
          updatedAt: new Date()
        };

        medias[index] = updateMedia;
        await writeMedias(medias);
        res.send("file upload successfully");
      }
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  }
);

mediasRouter.post("/:id/pdf", async (req, res, next) => {
  try {
    // Export single media data as PDF
    res.send("Export single media data as PDF");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

export default mediasRouter;
