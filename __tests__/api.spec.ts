import { app } from "../src/routes/";
import frisby from "frisby";

jest.mock("../src/services/representatives", () => {
  return {
    getRepresentatives: jest.fn(() => []),
  };
});

describe("endpoint smoke tests", () => {
  const HOST = "http://localhost";
  const PORT = 3000;
  let server;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    server = app.listen(PORT, () => {});
  });

  afterAll(() => {
    server.close();
  });

  it("/representatives should exist", async function () {
    const endpoint = `${HOST}:${PORT}/representatives/`;
    const res = await frisby.post(endpoint);
    expect(res.status).toBe(200);
    expect(res.status).not.toBe(203);
  });
});
