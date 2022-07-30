"use strict";
import express from "express";
import { getRepresentatives } from "../services/representatives";
const router = express.Router();
import { logger } from "../utils/logger"

router.get("/", async (req, res) => {
  try {
    const ret = await getRepresentatives(req.query);
    res.json(ret);
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      message: `Something went wrong. Please review your request`,
      query: req.query,
    });
  }
});

export { router };
