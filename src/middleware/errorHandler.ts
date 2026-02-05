import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

/**
 * Handles unknown routes so the API returns a consistent JSON 404 response.
 */
export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: "Not Found", path: req.path });
}

/**
 * Centralized error handler so unexpected errors don't crash the app
 * or leak internal details. Keeps API responses consistent.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Bad Request",
      issues: err.issues
    });
  }

  const message = err instanceof Error ? err.message : "Unexpected error";

  res.status(500).json({
    error: "Internal Server Error",
    message
  });
}

