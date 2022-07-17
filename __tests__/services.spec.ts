import { getRepresentatives } from "../src/services/representatives";

// mock out API calls for unit testing
jest.mock("../src/utils/apiCalls", () => {
  return {
    getChamberMembers: jest.fn(() => ["all members"]),
    getMembersByDistrict: jest.fn((state, district) => [
      {
        first_name: "Dan",
        last_name: "Sullivan",
        profile_image: "",
        chamber: "senate",
        member_id: "S001198",
        state: "AK",
      },
      {
        first_name: "Lisa",
        last_name: "Murkowski",
        profile_image: "",
        chamber: "senate",
        member_id: "M001153",
        state: "AK",
      },
      district
        ? {
            first_name: "Don",
            last_name: "Young",
            profile_image: "",
            chamber: "house",
            member_id: "Y000033",
            state: "AK",
          }
        : null,
    ]),
  };
});

jest.mock("../src/utils/apiHelpers", () => {
  return {
    responseToMember: jest.fn((input) => input),
  };
});

describe("getRepresentatives test suite", () => {
  test("Should return all members when no body provided", async () => {
    const mockBody = {};
    const res = await getRepresentatives(mockBody);

    expect(res).toBeInstanceOf(Array);
    expect(res[0]).toBe("all members");
  });

  test("Should return all members in a state if provided", async () => {
    const mockBody = { state: "FL" };
    const res = await getRepresentatives(mockBody);

    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(3);
    expect(res[2]).toBeFalsy();
    expect(res[1]).toBeTruthy();
    expect(res[0].first_name).toBe("Dan");
    expect(res[0].first_name).not.toBe("Jeff");
  });

  test("Should return 3 relevant members if state and district are provided", async () => {
    const state = "CO";
    const district = 1;
    const mockBody = { state, district };
    const res = await getRepresentatives(mockBody);

    expect(res).toBeInstanceOf(Array);
    expect(res.length).toBe(3);
    expect(res.length).not.toBe(2);
  });
});
