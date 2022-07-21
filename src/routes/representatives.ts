"use strict";
import express from "express";
import { getRepresentatives } from "../services/representatives";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const ret = await getRepresentatives(req.body);
    res.json(ret);
  } catch (error) {
    console.error(error);
    res.status(400).json(`Something went wrong`);
  }
});

export { router };
