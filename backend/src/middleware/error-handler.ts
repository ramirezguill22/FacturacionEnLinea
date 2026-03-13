import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";
import { NetSuiteIntegrationError } from "../errors/netsuite-integration-error";

export function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      ok: false,
      status: "error_validacion",
      message: error.message
    });
  }

  if (error instanceof NetSuiteIntegrationError) {
    return response.status(error.statusCode).json({
      ok: false,
      status: "error_interno",
      message: error.message
    });
  }

  console.error("[backend] error no controlado", error);

  return response.status(500).json({
    ok: false,
    status: "error_interno",
    message: "Ocurrió un error interno"
  });
}