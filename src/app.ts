import express from "express";
import { requestLogger } from "./middleware/requestLogger";
import { healthRouter } from "./routes/health";
import { notFound, errorHandler } from "./middleware/errorHandler";
import { eventsRouter } from "./routes/events";
import { config } from "./config";


export function createApp() {
  const app = express();

  // Parse JSON bodies so req.body works for POST/PUT requests
  app.use(express.json({ limit: "1mb" }));

  // Log incoming requests (except /health)
  if (config.NODE_ENV !== "test"){      
  app.use(requestLogger);
  }
  // Routes
  app.use(healthRouter);
  app.use(eventsRouter);


  // 404 handler (must come after routes)
  app.use(notFound);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
