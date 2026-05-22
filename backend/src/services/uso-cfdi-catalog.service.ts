import { getUsoCfdiCatalogFromNetSuite } from "./netsuite-catalog.service";
import type {
  UsoCfdiCatalogApiResponse,
  UsoCfdiCatalogOption,
  UsoCfdiCatalogStatus,
  NetSuiteUsoCfdiCatalogResponse
} from "../types/netsuite";

function isSuccessfulStatus(status: UsoCfdiCatalogStatus): boolean {
  return status === "encontrado";
}

function normalizeUsoCfdiCatalogResponse(
  result: NetSuiteUsoCfdiCatalogResponse
): UsoCfdiCatalogApiResponse {
  return {
    success: isSuccessfulStatus(result.status),
    status: result.status,
    message: result.message,
    data: {
      options: (result.options ?? []).filter(
        (option): option is UsoCfdiCatalogOption => Boolean(option?.id && option?.text)
      )
    }
  };
}

export async function getUsoCfdiCatalog(): Promise<UsoCfdiCatalogApiResponse> {
  const result = await getUsoCfdiCatalogFromNetSuite({ catalogId: "customlist_cfdi_uso" });

  return normalizeUsoCfdiCatalogResponse(result);
}