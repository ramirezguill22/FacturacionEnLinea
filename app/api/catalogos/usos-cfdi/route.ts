import { forwardJsonRequestToBackend } from "../../../lib/backend/client";
import { backendRoutes } from "../../../lib/backend/routes";

export async function GET() {
  return forwardJsonRequestToBackend({
    method: "GET",
    path: backendRoutes.catalogos.usosCfdi
  });
}