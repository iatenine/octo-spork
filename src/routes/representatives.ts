"use strict";
import express from "express";
import { getRepresentatives } from "../services/representatives";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ret = await getRepresentatives(req.query);
    res.json(ret);
  } catch (error) {
    // This does need to be replaced with a real logger
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(400).json({
      message: `Something went wrong. Please review your request`,
      query: req.query,
    });
  }
});

export { router };
