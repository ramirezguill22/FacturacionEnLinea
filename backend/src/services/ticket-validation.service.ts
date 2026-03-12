import { config } from "../config/env";
import { AppError } from "../errors/app-error";

type TicketValidationRequest = {
  numeroTicket?: unknown;
};

type TicketValidationResponse =
  | {
      ok: true;
      encontrado: true;
      estatus: "ticket_encontrado";
      mensaje: "Ticket encontrado";
    }
  | {
      ok: true;
      encontrado: false;
      estatus: "ticket_no_encontrado";
      mensaje: "No se encontró una orden de venta con ese ticket";
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

export function validateTicket(request: TicketValidationRequest): TicketValidationResponse {
  const normalizedTicket = normalizeTicketValue(request.numeroTicket);

  if (normalizedTicket === config.mockFoundTicket) {
    return {
      ok: true,
      encontrado: true,
      estatus: "ticket_encontrado",
      mensaje: "Ticket encontrado"
    };
  }

  return {
    ok: true,
    encontrado: false,
    estatus: "ticket_no_encontrado",
    mensaje: "No se encontró una orden de venta con ese ticket"
  };
}