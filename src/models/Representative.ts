import { Schema, model } from "mongoose";

const representativeModel = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  suffix: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  next_election: {
    type: Number,
  },
  twitter_account: {
    type: String,
  },
  facebook_account: {
    type: String,
  },
  youtube_account: {
    type: String,
  },
  url: {
    type: String,
  },
  contact_form: {
    type: String,
  },
  in_office: {
    type: Boolean,
  },
  seniority: {
    type: String,
  },
  total_votes: {
    type: Number,
  },
  missed_votes: {
    type: Number,
  },
  total_present: {
    type: Number,
  },
  state: {
    type: String,
  },
  missed_votes_pct: {
    type: Number,
  },
  votes_with_party_pct: {
    type: Number,
  },
  votes_against_party_pct: {
    type: Number,
  },
  phone: {
    type: String,
  },
  govtrack_id: {
    type: String,
  },
  cspan_id: {
    type: String,
  },
  votesmart_id: {
    type: String,
  },
  icpsr_id: {
    type: String,
  },
  office: {
    type: String,
  },
  last_updated: {
    type: String,
  },
  fec_candidate_id: {
    type: String,
  },
  party: {
    type: String,
  },
  leadership_role: {
    type: String,
  },
  district: {
    type: String,
  },
  at_large: {
    type: Boolean,
  },
  voting_records: [
    {
      type: Schema.Types.ObjectId,
      ref: "VotingRecord",
    },
  ],
  finances: [
    {
      type: Schema.Types.ObjectId,
      ref: "finances",
    },
  ],
});

const Representative = model("representative", representativeModel);

export default Representative;
