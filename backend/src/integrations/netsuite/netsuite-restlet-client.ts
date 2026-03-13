import { config } from "../../config/env";
import { NetSuiteIntegrationError } from "../../errors/netsuite-integration-error";
import type {
  NetSuiteTicketValidationRequest,
  NetSuiteTicketValidationResponse
} from "../../types/netsuite";
import { buildNetSuiteTbaAuthorization } from "./netsuite-tba";

function ensureNetSuiteConfig() {
  if (!config.netSuite.isConfigured) {
    throw new NetSuiteIntegrationError(
      "La configuración de NetSuite no está completa en las variables de entorno.",
      500
    );
  }
}

function buildAbortSignal(timeoutMs: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeout)
  };
}

async function parseJsonResponse(response: Response): Promise<NetSuiteTicketValidationResponse> {
  const rawBody = await response.text();

  if (!rawBody) {
    throw new NetSuiteIntegrationError("NetSuite devolvió una respuesta vacía.");
  }

  try {
    return JSON.parse(rawBody) as NetSuiteTicketValidationResponse;
  } catch {
    throw new NetSuiteIntegrationError("NetSuite devolvió una respuesta no válida en formato JSON.");
  }
}

export async function postTicketValidationToNetSuite(
  payload: NetSuiteTicketValidationRequest
): Promise<NetSuiteTicketValidationResponse> {
  ensureNetSuiteConfig();

  const { signal, cancel } = buildAbortSignal(config.netSuite.timeoutMs);

  try {
    const response = await fetch(config.netSuite.restletUrl, {
      method: "POST",
      headers: {
        Authorization: buildNetSuiteTbaAuthorization("POST", config.netSuite.restletUrl),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: signal
    });

    if (!response.ok) {
      throw new NetSuiteIntegrationError(
        `NetSuite respondió con estatus HTTP ${response.status}.`,
        response.status >= 500 ? 502 : response.status
      );
    }

    return await parseJsonResponse(response);
  } catch (error) {
    if (error instanceof NetSuiteIntegrationError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new NetSuiteIntegrationError("La llamada a NetSuite excedió el tiempo límite configurado.", 504);
    }

    throw new NetSuiteIntegrationError(
      error instanceof Error
        ? `No fue posible comunicarse con NetSuite: ${error.message}`
        : "No fue posible comunicarse con NetSuite."
    );
  } finally {
    cancel();
  }
}