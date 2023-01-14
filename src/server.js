import express from "express";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./api/medias/index.js";
import cors from "cors";
import createHttpError from "http-errors"

import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler
} from "./errorHandlers.js";

const server = express();
const port = process.env.PORT;

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method ${req.method} - url ${req.url} `);
  next();
};
const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: (origin, corsNext) => {
    console.log("CURRENT ORIGIN: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // If current origin is in the whitelist you can move on
      corsNext(null, true);
    } else {
      // If it is not --> error
      corsNext(
        createHttpError(400, `Origin ${origin} is not in the whitelist!`)
      );
    }
  }
};
server.use(cors(corsOptions));
server.use(express.json());

// ****************** ENDPOINTS *********************
server.use("/medias", loggerMiddleware, mediasRouter);

// ****************** ERROR HANDLERS ****************
server.use(badRequestHandler); // 400
server.use(unauthorizedHandler); // 401
server.use(notFoundHandler); // 404
server.use(genericErrorHandler); // 500

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
});
