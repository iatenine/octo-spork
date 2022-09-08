"use strict";
import { Document } from "mongoose";
import Representative from "../models/Representative";
import { fetchChamberMembers } from "../utils/apiCalls";

export const getRepresentatives = async (query: object): Promise<Document[]> =>
  await Representative.find(query);

export const fetchAllMembers = async () => {
  const senators = await fetchChamberMembers("senate");
  const reps = await fetchChamberMembers("house");
  return [...senators, ...reps];
};

export const refreshRepresentatives = async (): Promise<void> => {
  const res = await Representative.deleteMany({});
  if (!res.acknowledged) throw new Error("deleteMany method not acknowledged");
  const members = await fetchAllMembers();
  Representative.insertMany(members);
};
