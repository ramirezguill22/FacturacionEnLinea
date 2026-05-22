import type {
  NetSuiteUsoCfdiCatalogRequest,
  NetSuiteUsoCfdiCatalogResponse
} from "../types/netsuite";
import { postUsoCfdiCatalogToNetSuite } from "../integrations/netsuite/netsuite-restlet-client";

export async function getUsoCfdiCatalogFromNetSuite(
  payload: NetSuiteUsoCfdiCatalogRequest
): Promise<NetSuiteUsoCfdiCatalogResponse> {
  return postUsoCfdiCatalogToNetSuite(payload);
}