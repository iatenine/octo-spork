"use strict";
import express from "express";
import {
  getRepresentatives,
  getRepresentativeById,
} from "../services/representatives";
const router = express.Router();
import Logger from "../utils/logger";

const { logger } = Logger;

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

router.get("/:id", async (req, res) => {
  try {
    const response = await getRepresentativeById(req.params.id);
    res.json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    logger.error(error);
    res.status(400).json({
      message: "Something went wrong. Please rveiw your request",
      query: req.query,
    });
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
