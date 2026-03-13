"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type ValidationResponse = {
  success: boolean;
  status: string;
  message: string;
  data?: {
    ticket?: string;
    salesOrderId?: string;
    salesOrderTranId?: string;
    matches?: number;
    ticketField?: string;
  };
};

export default function BillingStartPage() {
  const router = useRouter();
  const [ticket, setTicket] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/tickets/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ticket: ticket })
      });

      const result = (await response.json()) as ValidationResponse;
      const query = new URLSearchParams({
        success: result.success ? "true" : "false",
        status: result.status,
        message: result.message,
        ticket: result.data?.ticket ?? ticket.trim(),
        salesOrderId: result.data?.salesOrderId ?? "",
        salesOrderTranId: result.data?.salesOrderTranId ?? "",
        matches: result.data?.matches ? String(result.data.matches) : "",
        ticketField: result.data?.ticketField ?? ""
      });

      router.push(`/resultado-validacion?${query.toString()}`);
    } catch {
      setErrorMessage("No fue posible validar el ticket en este momento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        background:
          "linear-gradient(180deg, #f4f7fb 0%, #e8eef7 50%, #dde7f3 100%)",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "760px",
          padding: "48px 40px",
          borderRadius: "28px",
          backgroundColor: "#ffffff",
          boxShadow: "0 24px 70px rgba(18, 38, 63, 0.12)",
          border: "1px solid rgba(21, 55, 94, 0.08)",
          display: "grid",
          gap: "28px"
        }}
      >
        <div style={{ display: "grid", gap: "14px" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#355c7d"
            }}
          >
            Inicio del proceso
          </span>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              lineHeight: 1.08,
              color: "#14324b"
            }}
          >
            Iniciar facturación
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#52667a",
              maxWidth: "620px"
            }}
          >
            Completa esta información para validar el ticket contra el backend
            real del portal. La pantalla ya consulta el servicio y te dirige al
            resultado de validación.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
          <label style={{ display: "grid", gap: "8px", color: "#14324b" }}>
            <span style={{ fontWeight: 600 }}>Número de folio o ticket</span>
            <input
              type="text"
              placeholder="Ingresa tu número de folio o ticket"
              value={ticket}
              onChange={(event) => setTicket(event.target.value)}
              required
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #c9d7e6",
                fontSize: "1rem",
                color: "#14324b",
                backgroundColor: "#fbfdff"
              }}
            />
            <span
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.6,
                color: "#62788e"
              }}
            >
              Captura el número exactamente como aparece en tu comprobante para
              evitar rechazos por formato o búsqueda incorrecta.
            </span>
          </label>

          {errorMessage ? (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                backgroundColor: "#fff3f0",
                border: "1px solid #f3c7bc",
                color: "#9f3a22",
                lineHeight: 1.6
              }}
            >
              {errorMessage}
            </div>
          ) : null}

          <div
            style={{
              padding: "16px 18px",
              borderRadius: "16px",
              backgroundColor: "#f7fbff",
              border: "1px solid #d9e6f2",
              color: "#355c7d",
              lineHeight: 1.7
            }}
          >
            Durante la validación verás un resultado claro para saber si el
            ticket fue localizado, si no existe o si es necesario volver a
            intentarlo más tarde.
          </div>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
              paddingTop: "8px"
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                borderRadius: "999px",
                background: "linear-gradient(135deg, #0f5b8d 0%, #1f7aa5 100%)",
                color: "#ffffff",
                border: "none",
                padding: "16px 28px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 14px 32px rgba(15, 91, 141, 0.24)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? "Validando..." : "Continuar"}
            </button>

            <Link
              href="/"
              style={{
                color: "#355c7d",
                fontWeight: 600,
                textDecoration: "none",
                padding: "12px 4px"
              }}
            >
              Regresar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}