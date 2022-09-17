"use strict";
import express from "express";
import { getRepresentatives } from "../services/representatives";
const router = express.Router();
import Logger from "../utils/logger";
const { logger } = Logger;

router.get("/", async (req, res) => {
  try {
    const ret = await getRepresentatives({ ...req.query, in_office: true });
    res.setHeader("Access-Control-Allow-Origin", "*");
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
