import type { Request, Response } from "express";

import { validateTicket } from "../services/ticket-validation.service";

export function validateTicketController(request: Request, response: Response) {
  const result = validateTicket(request.body);

  return response.status(200).json(result);
}