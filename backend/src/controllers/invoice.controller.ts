import type { NextFunction, Request, Response } from "express";

import { generateInvoice } from "../services/invoice-generation.service";

export async function generateInvoiceController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await generateInvoice(request.body);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}