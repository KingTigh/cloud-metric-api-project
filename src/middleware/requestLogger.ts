import morgan from "morgan";

/**
 * log each HTTP request with method, path, status, response size, and latency.
 * skip /health to avoid noisy logs from uptime checks.
 */
export const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    skip: (req) => (req.url ?? "").startsWith("/health"),
  }
);
