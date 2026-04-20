import { config } from "../config/env";
import { AppError } from "../errors/app-error";
import { validateTicketAgainstNetSuite } from "./netsuite-ticket.service";
import type {
  NetSuiteTicketValidationResponse,
  TicketValidationApiResponse,
  TicketValidationStatus
} from "../types/netsuite";

type TicketValidationRequest = {
  ticket?: unknown;
  numeroTicket?: unknown;
};

function normalizeTicketValue(ticketValue: unknown): string {
  if (typeof ticketValue !== "string") {
    throw new AppError("El número de ticket no es válido");
  }

  const normalizedTicket = ticketValue.trim();

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

function isSuccessfulStatus(status: TicketValidationStatus): boolean {
  return status === "encontrado";
}

function normalizeTicketValidationResponse(
  result: NetSuiteTicketValidationResponse,
  requestedTicket: string
): TicketValidationApiResponse {
  return {
    success: isSuccessfulStatus(result.status),
    status: result.status,
    message: result.message,
    data: {
      ticket: result.ticket ?? requestedTicket,
      salesOrderId: result.salesOrderId,
      salesOrderTranId: result.salesOrderTranId,
      total: result.total,
      currency: result.currency,
      matches: result.matches,
      ticketField: result.ticketField
    }
  };
}

export async function validateTicket(
  request: TicketValidationRequest
): Promise<TicketValidationApiResponse> {
  const normalizedTicket = normalizeTicketValue(request.ticket ?? request.numeroTicket);
  const result = await validateTicketAgainstNetSuite({ ticket: normalizedTicket });

  return normalizeTicketValidationResponse(result, normalizedTicket);
}