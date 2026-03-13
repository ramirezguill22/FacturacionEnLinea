import { NextRequest, NextResponse } from "next/server";

import { forwardJsonRequestToBackend } from "../../../lib/backend/client";
import { backendRoutes } from "../../../lib/backend/routes";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  return forwardJsonRequestToBackend({
    method: "POST",
    path: backendRoutes.tickets.validar,
    payload: payload
  });
}