import { config } from "../config/env";
import { AppError } from "../errors/app-error";
import { validateTicketAgainstNetSuite } from "./netsuite-ticket.service";
import type { NetSuiteTicketValidationResponse } from "../types/netsuite";

type TicketValidationRequest = {
  numeroTicket?: unknown;
};

function normalizeTicketValue(numeroTicket: unknown): string {
  if (typeof numeroTicket !== "string") {
    throw new AppError("El número de ticket no es válido");
  }

  const normalizedTicket = numeroTicket.trim();

  if (!normalizedTicket) {
    throw new AppError("El número de ticket no es válido");
  }

  if (normalizedTicket.length < config.ticketMinLength) {
    throw new AppError(
      `El número de ticket debe tener al menos ${config.ticketMinLength} caracteres`
    );
  }

  return normalizedTicket;
}

export async function validateTicket(
  request: TicketValidationRequest
): Promise<NetSuiteTicketValidationResponse> {
  const normalizedTicket = normalizeTicketValue(request.numeroTicket);

  return validateTicketAgainstNetSuite({ numeroTicket: normalizedTicket });
}