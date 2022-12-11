import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";

import config from "./config/config";
import middleware from "./helper/middleware";
import routes from "./routes/IndexRoutes";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use(middleware.cors);
app.use(middleware.debug);

app.use("/api", routes.UsersRoutes);
app.use("/test", routes.TestRoutes);

app.use(middleware.handleError);

mongoose
  .connect(config.mongodb_uri)
  .then(() => {
    console.log("Successfully connect to database");

    app.listen(config.port, config.host, () => {
      console.log(`Server is listening on ${config.host}:${config.port}`);
    });
  })
  .catch((error) => console.log(error));
