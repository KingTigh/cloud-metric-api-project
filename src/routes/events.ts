import { Router } from "express";
import { z } from "zod";
import { pool } from "../db";

export const eventsRouter = Router();

const CreateEventSchema = z.object({
  type: z.string().min(1),
  payload: z.unknown()
});

eventsRouter.post("/events", async (req, res, next) => {
  try {
    const { type, payload } = CreateEventSchema.parse(req.body);

    const result = await pool.query(
      `INSERT INTO events (type, payload)
       VALUES ($1, $2)
       RETURNING id, type, payload, created_at`,
      [type, payload]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

eventsRouter.get("/events", async (req, res, next) => {
  try {
    const limit = Number(req.query.limit ?? 50);
    const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 200) : 50;

    const result = await pool.query(
      `SELECT id, type, payload, created_at
       FROM events
       ORDER BY created_at DESC
       LIMIT $1`,
      [safeLimit]
    );

    res.json({ count: result.rowCount, events: result.rows });
  } catch (err) {
    next(err);
  }
});
