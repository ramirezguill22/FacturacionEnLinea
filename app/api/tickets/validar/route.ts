import { NextRequest, NextResponse } from "next/server";

const backendBaseUrl =
  process.env.BACKEND_API_BASE_URL?.trim() || "http://localhost:8080";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  try {
    const backendResponse = await fetch(`${backendBaseUrl}/api/tickets/validar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload),
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
        message: "No fue posible comunicarse con el backend de validación.",
        data: {}
      },
      { status: 502 }
    );
  }
}