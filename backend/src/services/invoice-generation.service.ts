import { config } from "../config/env";
import { AppError } from "../errors/app-error";
import { postInvoiceToNetSuite } from "../integrations/netsuite/netsuite-restlet-client";
import type { NetSuiteInvoiceResponse } from "../types/netsuite";

type InvoiceGenerationRequest = {
  salesorder?: unknown;
  ticket?: unknown;
};

function normalizeRequiredValue(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new AppError(`El campo ${fieldName} no es válido`);
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new AppError(`El campo ${fieldName} no es válido`);
  }

  return normalizedValue;
}

export async function generateInvoice(
  request: InvoiceGenerationRequest
): Promise<NetSuiteInvoiceResponse> {
  const salesorder = normalizeRequiredValue(request.salesorder, "salesorder");
  const ticket = normalizeRequiredValue(request.ticket, "ticket");

  if (ticket.length < config.ticketMinLength) {
    throw new AppError(
      `El número de ticket debe tener al menos ${config.ticketMinLength} caracteres`
    );
  }

  return postInvoiceToNetSuite({ salesorder: salesorder, ticket: ticket });
}