import mongoose, { Mongoose } from "mongoose";
const connectMongo = async function (dbName: string, MONGDB_URI: string) {
  try {
    await mongoose.connect(MONGDB_URI);
    console.log(`${dbName} succesfully connected to Mongo`);
  } catch (err) {
    console.error(err);
    console.log(`${dbName} had an issue connecting to Mongo`);
  }
};

export { connectMongo };
