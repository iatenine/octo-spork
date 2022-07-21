export interface iMember {
  first_name: string;
  last_name: string;
  profile_image: string;
  chamber: "senate" | "house" | null;
  member_id: string;
  state?: string;
  district?: number;
}

export interface iDistrict {
  zip?: number;
  state?: string;
  district?: number;
}
