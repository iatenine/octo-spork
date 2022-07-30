import axios from "axios";
import { iMember } from "../data/types";
import { logger } from "./logger";
const currentSession = 117;

export const getMembersByDistrict = async (
  inputState: string,
  district: number | undefined,
) => {
  const state = inputState.toUpperCase();
  if (state.length != 2) throw new Error(`Invalid state input: ${state}`);
  const senateUrl = `congress/v1/members/senate/${state}/current.json`;
  const houseUrl = `congress/v1/members/house/${state}/${district}/current.json`;

  const senators = await makePropublicaCall(senateUrl);
  const representatives = district
    ? await makePropublicaCall(houseUrl)
    : { results: (await getChamberMembers("house")) || [] };
  if (senators.errors?.length)
    throw new Error(`Error noted on call ${JSON.stringify(senators.errors)}`);
  const filteredHouse: iMember[] = !district
    ? representatives.results.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (member: any) => member?.state === state.toUpperCase(),
      )
    : representatives.results;

  if (!filteredHouse) throw new Error("Undefined results");

  const merge = [...senators.results, ...filteredHouse];

  return merge;
};

export const getChamberMembers = async (
  chamber: "house" | "senate",
  congress: number = currentSession,
) => {
  const getMembersEndpoint = `congress/v1/${congress}/${chamber}/members.json`;
  const data = await makePropublicaCall(getMembersEndpoint);
  return data.results[0].members;
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
