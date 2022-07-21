import { iMember } from "../data/types";

export const responseToMember = (
  memberRes: {
    first_name: string;
    last_name: string;
    role: string;
    id: string;
    state?: string;
  },
  state = "",
): iMember => {
  const member: iMember = {
    first_name: memberRes?.first_name,
    last_name: memberRes?.last_name,
    profile_image: "",
    chamber: memberRes?.role ? "senate" : "house",
    member_id: memberRes.id,
    state: memberRes.state || state,
  };

  return member;
};
