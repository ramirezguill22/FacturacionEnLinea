import type {
  NetSuiteTicketValidationRequest,
  NetSuiteTicketValidationResponse
} from "../types/netsuite";
import { postTicketValidationToNetSuite } from "../integrations/netsuite/netsuite-restlet-client";

export async function validateTicketAgainstNetSuite(
  payload: NetSuiteTicketValidationRequest
): Promise<NetSuiteTicketValidationResponse> {
  return postTicketValidationToNetSuite(payload);
}