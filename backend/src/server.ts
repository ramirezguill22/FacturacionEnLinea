import { createApp } from "./app";
import { config } from "./config/env";

const app = createApp();

app.listen(config.port, () => {
  console.log(`[backend] API lista en el puerto ${config.port}`);
});