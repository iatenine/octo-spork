"use strict";
import { app } from "./routes";
import connectMongo from "./config/connection";
import { refreshRepresentatives } from "./services/representatives";
const PORT: number | string = process.env.PORT || 3001;

const init = async () => {
  await connectMongo();
  await refreshRepresentatives();
  app.listen(PORT);
};

init();
