import axios from "axios";
import Representative from "../models/Representative";
import Logger from "../utils/logger";
const currentSession = 117;

const { logger } = Logger;

export const getChamberMembers = async (chamber: "house" | "senate") => {
  const regex = chamber === "senate" ? /senator/i : /representative/i;
  const results = Representative.find({
    title: { $regex: regex },
    in_office: true,
  });
  return results;
};

export const fetchChamberMembers = async (
  chamber: "house" | "senate",
  congress: number = currentSession,
) => {
  const getMembersEndpoint = `congress/v1/${congress}/${chamber}/members.json`;
  const data = await makePropublicaCall(getMembersEndpoint);
  return data.results[0].members;
};

export const getMemberVotes = async (id: string) => {
  const endpoint = `congress/v1/members/${id}/votes.json`;
  const response = await makePropublicaCall(endpoint);
  return response.results;
};

export const makePropublicaCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: `https://api.propublica.org/${endpoint}`,
    params: { "": "" },
    headers: { "X-API-Key": process.env.PROPUBLICA_KEY || "" },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};
