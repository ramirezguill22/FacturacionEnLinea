"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasPrefilledFromQuery, setHasPrefilledFromQuery] = useState(false);

  useEffect(() => {
    if (hasPrefilledFromQuery) {
      return;
    }

    const ticketFromQuery = searchParams.get("ticket")?.trim() ?? "";

    if (!ticketFromQuery) {
      return;
    }

    setTicket(ticketFromQuery);
    setHasPrefilledFromQuery(true);
  }, [hasPrefilledFromQuery, searchParams]);

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
    <div className="portal-page">
      <section className="portal-grid-two portal-grid-single">
        <div className="portal-card portal-form-card">
          <div className="portal-section-head">
            <span className="portal-eyebrow">Inicio del proceso</span>
            <h1>Iniciar facturación</h1>
            <p>
              Captura el número de folio o ticket para ejecutar la validación sobre el servicio real del portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="portal-form">
            <label>
              <span>Número de folio o ticket</span>
            <input
              className="portal-input"
              type="text"
              placeholder="Ingresa tu número de folio o ticket"
              value={ticket}
              onChange={(event) => setTicket(event.target.value)}
              required
            />
            <span style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#62788e" }}>
              Captura el número exactamente como aparece en tu comprobante para
              evitar rechazos por formato o búsqueda incorrecta.
            </span>
            </label>

            {errorMessage ? <div className="portal-error-box">{errorMessage}</div> : null}
            <div className="portal-cta-row">
              <button type="submit" disabled={isSubmitting} className="portal-button">
                {isSubmitting ? "Validando..." : "Continuar"}
              </button>

              <Link href="/" className="portal-link-button">
                Regresar al inicio
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}