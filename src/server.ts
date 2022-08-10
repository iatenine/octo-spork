"use strict";
import { app } from "./routes";
import { connectMongo } from "./services/mongoDb";
const PORT: number | string = process.env.PORT || 3001;
const MONGODB_URI =
  "mongodb+srv://fonysony:6GyEGuDGRQP5Nvsh@octo-spork.pgoj3jj.mongodb.net/?retryWrites=true&w=majority";

app.listen(PORT);
connectMongo("octo-spork", MONGODB_URI);
