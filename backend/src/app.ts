import express from "express";

import { catalogRouter } from "./routes/catalog.routes";
import { customerRouter } from "./routes/customer.routes";
import { errorHandler } from "./middleware/error-handler";
import { ticketRouter } from "./routes/ticket.routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.status(200).json({
      ok: true,
      status: "ok",
      message: "Servicio disponible"
    });
  });

  app.use("/api/catalogos", catalogRouter);
  app.use("/api/tickets", ticketRouter);
  app.use("/api/clientes", customerRouter);
  app.use(errorHandler);

  return app;
}