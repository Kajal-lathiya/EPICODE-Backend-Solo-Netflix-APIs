import express from "express";
import listEndpoints from "express-list-endpoints";
import mediasRouter from "./api/medias/index.js";
import cors from "cors";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler
} from "./errorHandlers.js";

const server = express();
const port = 3001;

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method ${req.method} - url ${req.url} `);
  next();
};

server.use(cors());
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
