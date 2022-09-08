import mongoose from "mongoose";
const dbName = "octo-spork-db";
import Logger from "../utils/logger";
const { logger } = Logger;

const connectMongo = async function () {
  const MONGODB_URI =
    process.env.MONGODB_URI || `mongodb://127.0.0.1/${dbName}`;
  try {
    mongoose.connect(MONGODB_URI);
  } catch (err) {
    logger.error(err);
  }
};

export default connectMongo;
