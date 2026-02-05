import { createApp } from "./app";
import { config } from "./config";

const app = createApp();

app.listen(config.PORT, () => {
  console.log(
    JSON.stringify({
      level: "info",
      msg: "server_started",
      port: config.PORT,
      env: config.NODE_ENV,
      ts: new Date().toISOString()
    })
  );
});
