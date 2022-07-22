"use strict";
import express from "express";
import { getRepresentatives } from "../services/representatives";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const ret = await getRepresentatives(req.body);
    res.json(ret);
  } catch (error) {
    // This does need to be replaced with a real logger
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(400).json(`Something went wrong`);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const ret = await getRepresentatives(req.body);
    res.json(ret);
  } catch (error) {
    console.error(error);
    res.status(400).json(`Something went wrong`);
  }
});

export { router };
