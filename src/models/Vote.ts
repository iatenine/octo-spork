import { Schema, model } from "mongoose";

const billModel = new Schema({
  bill_id: {
    type: String,
  },
  number: {
    type: String,
  },
  title: {
    type: String,
  },
});

const amendmentModel = new Schema({
  number: {
    type: String,
  },
  api_url: {
    type: String,
  },
  sponsor_id: {
    type: String,
  },
  sponsor: {
    type: String,
  },
  sponsor_uri: {
    type: String,
  },
  sponsor_state: {
    type: String,
  },
});

const nominationModel = new Schema({
  nomination_id: {
    type: String,
  },
  number: {
    type: String,
  },
  name: {
    type: String,
  },
  agency: {
    type: String,
  },
});

const totalModel = new Schema({
  yes: {
    type: Number,
    required: true,
  },
  no: {
    type: Number,
    required: true,
  },
  present: {
    type: Number,
    required: true,
  },
  not_voting: {
    type: Number,
    required: true,
  },
});

const voteModel = new Schema({
  member_id: {
    type: String,
    required: true,
  },
  congress: {
    type: Number,
    required: true,
  },
  session: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  vote_uri: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  bill: billModel,
  amendment: amendmentModel,
  nomination: nominationModel,
  totals: totalModel,
});

const VotingRecord = model("votingRecord", voteModel);

export default VotingRecord;
