import type { NextFunction, Request, Response } from "express";

import { validateTicket } from "../services/ticket-validation.service";

export async function validateTicketController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await validateTicket(request.body);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}