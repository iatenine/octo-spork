"use strict";
import express from "express";
import { router } from "./representatives";
const app = express();

app.use("/representatives", router);

export { app };
