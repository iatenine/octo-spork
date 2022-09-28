"use strict";
import express, { Request, Response } from "express";
import { Document } from "mongoose";
import { Representative } from "../models";
import {
  getMemberVotingRecords,
  getRepresentatives,
} from "../services/representatives";
const router = express.Router();
import Logger from "../utils/logger";
const { logger } = Logger;

router.get("/", async (req: Request, res: Response) => {
  try {
    const ret = await getRepresentatives({ ...req.query });
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

router.get("/:member_id", async (req: Request, res: Response) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { member_id } = req.params;
    const member = await Representative.findOne({ member_id });
    const votingRecords: Document[] = await getMemberVotingRecords(member_id);
    res.json({
      member,
      votingRecords: {
        length: votingRecords.length,
        records: votingRecords,
      },
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      message: `Something went wrong. Please review your request`,
      query: req.query,
    });
  }
});

export { router };
