import request from "supertest";
import { createApp } from "../src/app";

describe("GET /health", () => {
  it("returns ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime_s).toBe("number");
    expect(typeof res.body.timestamp).toBe("string");
  });
});
