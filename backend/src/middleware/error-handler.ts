import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";

export function errorHandler(error: Error, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      ok: false,
      estatus: "error_validacion",
      mensaje: error.message
    });
  }

  console.error("[backend] error no controlado", error);

  return response.status(500).json({
    ok: false,
    estatus: "error_interno",
    mensaje: "Ocurrió un error interno"
  });
}