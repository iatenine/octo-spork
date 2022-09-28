import { Schema, model } from "mongoose";

const financeModel = new Schema({
  member_id: { type: String },
});

const Finance = model("finances", financeModel);

export default Finance;
