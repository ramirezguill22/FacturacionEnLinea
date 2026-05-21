import type { NextFunction, Request, Response } from "express";

import { getCustomerFiscalInfo } from "../services/customer-fiscal-info.service";

export async function getCustomerFiscalInfoController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await getCustomerFiscalInfo(request.body);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}