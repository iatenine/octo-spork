"use strict";
import { iMember, iDistrict } from "../data/types";
import { getChamberMembers, getMembersByDistrict } from "../utils/apiCalls";
import { responseToMember } from "../utils/apiHelpers";

export const getRepresentatives = async (
  body: iDistrict,
): Promise<iMember[]> => {
  // Check body for zip or state/dist params
  // If none exist, return all members
  // If only state exists return all members for that state
  // If district exists, return uses specific members
  if (body?.zip) {
    return [];
  }
  if (body?.state) {
    const members = await getMembersByDistrict(body.state, body?.district);
    const res: iMember[] =
      members?.map((elem) => responseToMember(elem, body.state)) || [];
    if (res.length && !res[0]?.first_name)
      throw new Error(
        `Something went wrong. Possibly invlaid state (${body?.state}) or district (${body?.district})`,
      );
    return res;
  }
  const senators = await getChamberMembers("senate");
  const reps = await getChamberMembers("house");
  const senateMembers: iMember[] = senators.map(
    (elem: {
      first_name: string;
      last_name: string;
      role: string;
      id: string;
    }) => responseToMember(elem),
  );
  const repmembers: iMember[] = reps.map(
    (elem: {
      first_name: string;
      last_name: string;
      role: string;
      id: string;
    }) => responseToMember(elem),
  );
  const merge: iMember[] = [...senateMembers, ...repmembers];
  return merge;
};
