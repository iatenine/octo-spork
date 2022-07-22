import { app } from "../src/routes/";
import frisby from "frisby";
import { Server } from "http";

jest.mock("../src/services/representatives", () => {
  return {
    getRepresentatives: jest.fn((query) => {
      if (query?.state && query?.state.length !== 2) throw new Error();
      return [{}];
    }),
  };
});

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

  it("/representatives should exist", async function () {
    const endpoint = `${HOST}:${PORT}/representatives/`;
    const res = await frisby.get(endpoint);
    expect(res.status).toBe(200);
    expect(res.status).not.toBe(203);
  });

  it("should return a 400 when state input causes an error", async function () {
    const endpoint = `${HOST}:${PORT}/representatives/?state=FLD`;
    const res = await frisby.get(endpoint);

    expect(res.status).toBe(400);
  });
});
