"use strict";
import { iMember, iDistrict } from "../data/types";
import { getChamberMembers, getMembersByDistrict } from "../utils/apiCalls";
import { responseToMember } from "../utils/apiHelpers";

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
  const senators = await getChamberMembers("senate");
  const reps = await getChamberMembers("house");
  const merge = [...senators, ...reps];
  return merge.map(
    (elem: {
      first_name: string;
      last_name: string;
      role: string;
      id: string;
    }) => responseToMember(elem),
  );
};
