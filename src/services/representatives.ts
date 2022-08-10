"use strict";
import { iMember, iDistrict } from "../data/types";
import {
  getChamberMembers,
  getMembersByDistrict,
  getMemberVotes,
} from "../utils/apiCalls";
import { responseToMember } from "../utils/apiHelpers";

export const getAllMembers = async () => {
  const senators = await getChamberMembers("senate");
  const reps = await getChamberMembers("house");
  return [...senators, ...reps];
};

export const getRepresentatives = async (
  query: iDistrict,
): Promise<iMember[]> => {
  // Narrow search if state query exists
  if (query?.state) {
    const members = await getMembersByDistrict(query.state, query?.district);
    const res: iMember[] =
      members?.map((elem) => responseToMember(elem, query.state)) || [];
    if (res.length && !res[0]?.first_name)
      throw new Error(
        `Something went wrong. Possibly invlaid state (${query?.state}) or district (${query?.district})`,
      );
    return res;
  }

  // Return everybody if state query is NOT included
  const allMembers = await getAllMembers();
  return allMembers.map(
    (elem: {
      first_name: string;
      last_name: string;
      role: string;
      id: string;
    }) => responseToMember(elem),
  );
};

export const getRepresentativeById = async (id: string): Promise<unknown[]> => {
  const everybody = await getAllMembers();
  const member = everybody.find((mem) => mem?.id === id);
  const voting = await getMemberVotes(id);
  const finances: unknown[] = [];

  return {
    ...member,
    voting,
    finances,
  };
};
