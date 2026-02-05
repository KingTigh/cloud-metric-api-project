import request from "supertest";
import { createApp } from "../src/app";
import { closeDb } from "../src/db";

describe("GET /events", () => {
  afterAll(async () => {
    await closeDb();
  });

  it("returns a list structure", async () => {
    const app = createApp();
    const res = await request(app).get("/events");

    expect(res.status).toBe(200);
    expect(typeof res.body.count).toBe("number");
    expect(Array.isArray(res.body.events)).toBe(true);
  });
});
