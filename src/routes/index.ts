"use strict";
import express from "express";
import { router } from "./representatives";
const app = express();
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/representatives", router);

export { app };
