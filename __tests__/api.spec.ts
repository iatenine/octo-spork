import { app } from "../src/routes/";
import frisby from "frisby";
import { Server } from "http";
import { Representative } from "../src/models";

jest.mock("../src/services/representatives", () => {
  return {
    getRepresentatives: jest.fn(() => {
      return [{}];
    }),
    getMemberVotingRecords: jest.fn(() => {
      return [];
    }),
  };
});

jest.spyOn(Representative, "findOne").mockReturnValue([]);

describe("endpoint smoke tests", () => {
  const HOST = "http://localhost";
  const PORT = 3001;
  let server: Server;

  beforeAll(() => {
    server = app.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  test("/representatives should exist", async function () {
    const endpoint = `${HOST}:${PORT}/representatives/`;
    const res = await frisby.get(endpoint);
    expect(res.status).toBe(200);
    expect(res.status).not.toBe(203);
  });

  test("/representatives/:id should exist", async function () {
    const endpoint = `${HOST}:${PORT}/representatives/H00465`;
    const res = await frisby.get(endpoint);
    expect(res.status).toBe(200);
    expect(res.status).not.toBe(203);
  });
});
