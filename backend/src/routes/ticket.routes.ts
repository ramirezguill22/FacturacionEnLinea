import { Router } from "express";

import { validateTicketController } from "../controllers/ticket.controller";

const ticketRouter = Router();

ticketRouter.post("/validar", validateTicketController);

export { ticketRouter };