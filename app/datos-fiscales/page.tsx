"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CustomerFiscalInfoResponse = {
  success: boolean;
  status: string;
  message: string;
  data?: {
    customerId?: string;
    razonSocial?: string;
    rfc?: string;
    usoCfdiId?: string;
    usoCfdi?: string;
    regimenFiscal?: string;
    codigoPostal?: string;
  };
};

type InvoiceResponse = {
  success: boolean;
  estatusTimbrado?: "EXITO" | "ERROR";
  mensaje?: string;
  message?: string;
  data?: {
    facturaInternalId?: number;
    facturaTranId?: string;
    uuid?: string | null;
    fechaTimbrado?: string | null;
    registroPersonalizadoId?: number;
  };
  error?: {
    etapa?: string;
  };
};

function FiscalDataPageContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId")?.trim() ?? "";
  const ticket = searchParams.get("ticket")?.trim() ?? "";
  const salesOrderTranId = searchParams.get("salesOrderTranId")?.trim() ?? "";
  const total = searchParams.get("total")?.trim() ?? "";
  const currency = searchParams.get("currency")?.trim() ?? "";
  const totalDisplay = [total, currency].filter(Boolean).join(" ");
  const modificationQuery = new URLSearchParams({
    customerId: customerId,
    ticket: ticket,
    salesOrderTranId: salesOrderTranId,
    total: total,
    currency: currency
  }).toString();
  const [result, setResult] = useState<CustomerFiscalInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [invoiceResult, setInvoiceResult] = useState<InvoiceResponse | null>(null);

  useEffect(() => {
    if (!customerId) {
      setResult(null);
      setErrorMessage("No se recibió un id interno de cliente para consultar los datos fiscales.");
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadFiscalInfo() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/clientes/datos-fiscales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ customerId: customerId })
        });

        const fiscalInfo = (await response.json()) as CustomerFiscalInfoResponse;

        if (isCancelled) {
          return;
        }

        setResult(fiscalInfo);

        if (!fiscalInfo.success) {
          setErrorMessage(fiscalInfo.message);
        }
      } catch {
        if (isCancelled) {
          return;
        }

        setResult(null);
        setErrorMessage("No fue posible obtener la información fiscal del cliente.");
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadFiscalInfo();

    return () => {
      isCancelled = true;
    };
  }, [customerId]);

  async function handleGenerateInvoice() {
    if (isGeneratingInvoice || invoiceResult) {
      return;
    }

    if (!ticket || !salesOrderTranId) {
      setInvoiceResult({
        success: false,
        message: "No fue posible identificar el ticket y la orden de venta."
      });
      return;
    }

    const confirmed = window.confirm(
      "Se creará y timbrará la factura con los datos fiscales mostrados. ¿Deseas continuar?"
    );

    if (!confirmed) {
      return;
    }

    setIsGeneratingInvoice(true);

    try {
      const response = await fetch("/api/facturas/generar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          salesorder: salesOrderTranId,
          ticket: ticket
        })
      });
      const invoice = (await response.json()) as InvoiceResponse;

      setInvoiceResult(invoice);
    } catch {
      setInvoiceResult({
        success: false,
        message:
          "No fue posible confirmar el resultado de la facturación. No intentes nuevamente y solicita revisión."
      });
    } finally {
      setIsGeneratingInvoice(false);
    }
  }

  return (
    <div className="portal-page">
      <section className="portal-grid-two portal-grid-single">
        <div className="portal-card portal-result-card">
          <div className="portal-section-head">
            <span className="portal-eyebrow">Siguiente paso</span>
            <h1>Datos fiscales del cliente</h1>
            <p>
              Revisa la información fiscal localizada para este cliente antes de continuar con el flujo.
            </p>
          </div>

          {isLoading ? (
            <div className="portal-result-summary">
              <div className="portal-result-summary__head">
                <span className="portal-eyebrow">Consulta en proceso</span>
                <strong>Buscando información fiscal del cliente</strong>
              </div>
            </div>
          ) : null}

          {errorMessage ? <div className="portal-error-box">{errorMessage}</div> : null}

          {result?.data && result.success ? (
            <div className="portal-result-grid">
              {ticket || salesOrderTranId || totalDisplay ? (
                <div className="portal-result-summary">
                  <div className="portal-result-summary__head">
                    <span className="portal-eyebrow">Datos de la compra</span>
                    <strong>Resumen del ticket validado</strong>
                  </div>

                  <div className="portal-result-summary__grid">
                    {ticket ? (
                      <div className="portal-result-meta">
                        <span className="portal-result-meta__label">Ticket</span>
                        <strong className="portal-result-meta__value">{ticket}</strong>
                      </div>
                    ) : null}

                    {salesOrderTranId ? (
                      <div className="portal-result-meta">
                        <span className="portal-result-meta__label">Orden de venta</span>
                        <strong className="portal-result-meta__value">{salesOrderTranId}</strong>
                      </div>
                    ) : null}

                    {totalDisplay ? (
                      <div className="portal-result-meta">
                        <span className="portal-result-meta__label">Total</span>
                        <strong className="portal-result-meta__value">{totalDisplay}</strong>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="portal-result-summary">
                <div className="portal-result-summary__head">
                  <span className="portal-eyebrow">Información fiscal localizada</span>
                  <strong>Resumen fiscal del cliente</strong>
                </div>

                <div className="portal-result-summary__grid">
                  <div className="portal-result-meta">
                    <span className="portal-result-meta__label">Razón social</span>
                    <strong className="portal-result-meta__value">
                      {result.data.razonSocial || "No disponible"}
                    </strong>
                  </div>

                  <div className="portal-result-meta">
                    <span className="portal-result-meta__label">RFC</span>
                    <strong className="portal-result-meta__value">
                      {result.data.rfc || "No disponible"}
                    </strong>
                  </div>

                  <div className="portal-result-meta">
                    <span className="portal-result-meta__label">Uso de CFDI</span>
                    <strong className="portal-result-meta__value">
                      {result.data.usoCfdi || "No disponible"}
                    </strong>
                  </div>

                  <div className="portal-result-meta">
                    <span className="portal-result-meta__label">Régimen fiscal</span>
                    <strong className="portal-result-meta__value">
                      {result.data.regimenFiscal || "No disponible"}
                    </strong>
                  </div>

                  <div className="portal-result-meta">
                    <span className="portal-result-meta__label">Código postal</span>
                    <strong className="portal-result-meta__value">
                      {result.data.codigoPostal || "No disponible"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {invoiceResult ? (
            <div className="portal-result-summary">
              <div className="portal-result-summary__head">
                <span className="portal-eyebrow">Resultado de facturación</span>
                <strong>
                  {invoiceResult.success
                    ? "Factura creada y timbrada correctamente"
                    : invoiceResult.data?.facturaInternalId
                      ? "Factura creada con timbrado pendiente"
                      : "No fue posible completar la facturación"}
                </strong>
              </div>

              <div className="portal-detail-card">
                {invoiceResult.mensaje ?? invoiceResult.message ?? "Resultado no disponible."}
              </div>

              {invoiceResult.data ? (
                <div className="portal-result-summary__grid">
                  {invoiceResult.data.facturaTranId ? (
                    <div className="portal-result-meta">
                      <span className="portal-result-meta__label">Factura</span>
                      <strong className="portal-result-meta__value">
                        {invoiceResult.data.facturaTranId}
                      </strong>
                    </div>
                  ) : null}

                  {invoiceResult.data.uuid ? (
                    <div className="portal-result-meta portal-result-meta--wide">
                      <span className="portal-result-meta__label">UUID</span>
                      <strong className="portal-result-meta__value">
                        {invoiceResult.data.uuid}
                      </strong>
                    </div>
                  ) : null}

                  {invoiceResult.data.fechaTimbrado ? (
                    <div className="portal-result-meta">
                      <span className="portal-result-meta__label">Fecha de timbrado</span>
                      <strong className="portal-result-meta__value">
                        {invoiceResult.data.fechaTimbrado}
                      </strong>
                    </div>
                  ) : null}

                  {!invoiceResult.success && invoiceResult.error?.etapa ? (
                    <div className="portal-result-meta">
                      <span className="portal-result-meta__label">Etapa pendiente</span>
                      <strong className="portal-result-meta__value">
                        {invoiceResult.error.etapa}
                      </strong>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="portal-cta-row">
            <Link href="/iniciar-facturacion" className="portal-button">
              Validar otro ticket
            </Link>
            <Link href="/" className="portal-link-button">
              Regresar al inicio
            </Link>
            {result?.data && result.success && !invoiceResult ? (
              <button
                type="button"
                className="portal-button portal-button--success"
                disabled={isGeneratingInvoice}
                onClick={handleGenerateInvoice}
              >
                {isGeneratingInvoice ? "Generando factura..." : "Generar y enviar factura"}
              </button>
            ) : null}
            {result?.data && result.success && !invoiceResult ? (
              <Link
                href={`/datos-fiscales-modificacion?${modificationQuery}`}
                className="portal-button portal-button--warning"
              >
                Modificar datos fiscales
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FiscalDataPage() {
  return (
    <Suspense fallback={null}>
      <FiscalDataPageContent />
    </Suspense>
  );
}