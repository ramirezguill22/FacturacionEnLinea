import type {
  NetSuiteCustomerFiscalInfoRequest,
  NetSuiteCustomerFiscalInfoResponse
} from "../types/netsuite";
import { postCustomerFiscalInfoToNetSuite } from "../integrations/netsuite/netsuite-restlet-client";

export async function getCustomerFiscalInfoFromNetSuite(
  payload: NetSuiteCustomerFiscalInfoRequest
): Promise<NetSuiteCustomerFiscalInfoResponse> {
  return postCustomerFiscalInfoToNetSuite(payload);
}