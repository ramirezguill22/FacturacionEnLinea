import type { NextFunction, Request, Response } from "express";

import { getUsoCfdiCatalog } from "../services/uso-cfdi-catalog.service";

export async function getUsoCfdiCatalogController(
  _request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await getUsoCfdiCatalog();

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}