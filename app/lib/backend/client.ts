import { NextResponse } from "next/server";

import { getBackendApiBaseUrl } from "./config";

type ForwardJsonRequestOptions = {
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  path: string;
  payload?: unknown;
};

export async function forwardJsonRequestToBackend({
  method,
  path,
  payload
}: ForwardJsonRequestOptions): Promise<NextResponse> {
  const backendUrl = `${getBackendApiBaseUrl()}${path}`;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: payload === undefined ? undefined : JSON.stringify(payload),
      cache: "no-store"
    });

    const rawBody = await backendResponse.text();

    return new NextResponse(rawBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "error_interno",
        message: "No fue posible comunicarse con el backend del portal.",
        data: {}
      },
      { status: 502 }
    );
  }
}