import { AppError } from "../errors/app-error";
import { getCustomerFiscalInfoFromNetSuite } from "./netsuite-customer.service";
import type {
  CustomerFiscalInfoApiResponse,
  CustomerFiscalInfoStatus,
  NetSuiteCustomerFiscalInfoResponse
} from "../types/netsuite";

type CustomerFiscalInfoRequest = {
  customerId?: unknown;
};

function normalizeCustomerIdValue(customerIdValue: unknown): string {
  if (typeof customerIdValue !== "string") {
    throw new AppError("El id interno del cliente no es válido");
  }

  const normalizedCustomerId = customerIdValue.trim();

  if (!normalizedCustomerId) {
    throw new AppError("El id interno del cliente no es válido");
  }

  return normalizedCustomerId;
}

function isSuccessfulStatus(status: CustomerFiscalInfoStatus): boolean {
  return status === "encontrado";
}

function normalizeCustomerFiscalInfoResponse(
  result: NetSuiteCustomerFiscalInfoResponse,
  requestedCustomerId: string
): CustomerFiscalInfoApiResponse {
  return {
    success: isSuccessfulStatus(result.status),
    status: result.status,
    message: result.message,
    data: {
      customerId: result.customerId ?? requestedCustomerId,
      razonSocial: result.razonSocial,
      rfc: result.rfc,
      usoCfdiId: result.usoCfdiId,
      usoCfdi: result.usoCfdi,
      regimenFiscal: result.regimenFiscal,
      codigoPostal: result.codigoPostal
    }
  };
}

export async function getCustomerFiscalInfo(
  request: CustomerFiscalInfoRequest
): Promise<CustomerFiscalInfoApiResponse> {
  const normalizedCustomerId = normalizeCustomerIdValue(request.customerId);
  const result = await getCustomerFiscalInfoFromNetSuite({ customerId: normalizedCustomerId });

  return normalizeCustomerFiscalInfoResponse(result, normalizedCustomerId);
}