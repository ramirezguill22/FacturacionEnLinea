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

type UsoCfdiCatalogResponse = {
  success: boolean;
  status: string;
  message: string;
  data?: {
    options?: Array<{
      id: string;
      text: string;
    }>;
  };
};

const GENERIC_RFC = "XAXX010101000";

function FiscalDataModificationPageContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId")?.trim() ?? "";
  const ticket = searchParams.get("ticket")?.trim() ?? "";
  const salesOrderTranId = searchParams.get("salesOrderTranId")?.trim() ?? "";
  const total = searchParams.get("total")?.trim() ?? "";
  const currency = searchParams.get("currency")?.trim() ?? "";
  const totalDisplay = [total, currency].filter(Boolean).join(" ");
  const [result, setResult] = useState<CustomerFiscalInfoResponse | null>(null);
  const [usoCfdiOptions, setUsoCfdiOptions] = useState<Array<{ id: string; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [usoCfdiId, setUsoCfdiId] = useState("");

  useEffect(() => {
    if (!customerId) {
      setResult(null);
      setErrorMessage("No se recibió un id interno de cliente para modificar los datos fiscales.");
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadData() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const fiscalResponse = await fetch("/api/clientes/datos-fiscales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ customerId: customerId })
        });
        const fiscalInfo = (await fiscalResponse.json()) as CustomerFiscalInfoResponse;

        if (isCancelled) {
          return;
        }

        setResult(fiscalInfo);

        if (!fiscalInfo.success || !fiscalInfo.data) {
          setErrorMessage(fiscalInfo.message);
          return;
        }

        setCodigoPostal(fiscalInfo.data.codigoPostal ?? "");
        setUsoCfdiId(fiscalInfo.data.usoCfdiId ?? "");

        if (fiscalInfo.data.rfc === GENERIC_RFC) {
          return;
        }

        const catalogResponse = await fetch("/api/catalogos/usos-cfdi", {
          method: "GET",
          cache: "no-store"
        });
        const catalog = (await catalogResponse.json()) as UsoCfdiCatalogResponse;

        if (isCancelled) {
          return;
        }

        if (!catalog.success) {
          setErrorMessage(catalog.message);
          return;
        }

        setUsoCfdiOptions(catalog.data?.options ?? []);
      } catch {
        if (isCancelled) {
          return;
        }

        setResult(null);
        setErrorMessage("No fue posible obtener la información necesaria para modificar los datos fiscales.");
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      isCancelled = true;
    };
  }, [customerId]);

  const shouldShowGenericRfcPlaceholder = result?.data?.rfc === GENERIC_RFC;

  return (
    <div className="portal-page">
      <section className="portal-grid-two portal-grid-single">
        <div className="portal-card portal-result-card">
          <div className="portal-section-head">
            <span className="portal-eyebrow">Siguiente paso</span>
            <h1>Modificación de datos fiscales</h1>
            <p>
              Revisa y ajusta los campos editables antes de continuar con el proceso de facturación.
            </p>
          </div>

          {isLoading ? (
            <div className="portal-result-summary">
              <div className="portal-result-summary__head">
                <span className="portal-eyebrow">Consulta en proceso</span>
                <strong>Preparando la pantalla de modificación fiscal</strong>
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

              {shouldShowGenericRfcPlaceholder ? (
                <div className="portal-result-summary">
                  <div className="portal-result-summary__head">
                    <span className="portal-eyebrow">Pendiente</span>
                    <strong>Implementación pendiente para RFC genérico</strong>
                  </div>
                  <div className="portal-detail-card">
                    La modificación fiscal para clientes con RFC XAXX010101000 queda pendiente por implementar.
                  </div>
                </div>
              ) : (
                <div className="portal-result-summary">
                  <div className="portal-result-summary__head">
                    <span className="portal-eyebrow">Información fiscal localizada</span>
                    <strong>Resumen fiscal editable del cliente</strong>
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
                      <span className="portal-result-meta__label">Régimen fiscal</span>
                      <strong className="portal-result-meta__value">
                        {result.data.regimenFiscal || "No disponible"}
                      </strong>
                    </div>

                    <div className="portal-result-meta">
                      <label className="portal-form" style={{ gap: "10px" }}>
                        <span className="portal-result-meta__label">Uso de CFDI</span>
                        <select
                          className="portal-input"
                          value={usoCfdiId}
                          onChange={(event) => setUsoCfdiId(event.target.value)}
                          required
                        >
                          <option value="">Selecciona una opción</option>
                          {usoCfdiOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="portal-result-meta">
                      <label className="portal-form" style={{ gap: "10px" }}>
                        <span className="portal-result-meta__label">Código postal</span>
                        <input
                          className="portal-input"
                          type="text"
                          value={codigoPostal}
                          onChange={(event) => setCodigoPostal(event.target.value)}
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="portal-cta-row">
            <Link href="/iniciar-facturacion" className="portal-button">
              Validar otro ticket
            </Link>
            <Link href={`/datos-fiscales?${new URLSearchParams({
              customerId: customerId,
              ticket: ticket,
              salesOrderTranId: salesOrderTranId,
              total: total,
              currency: currency
            }).toString()}`} className="portal-link-button">
              Regresar a datos fiscales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FiscalDataModificationPage() {
  return (
    <Suspense fallback={null}>
      <FiscalDataModificationPageContent />
    </Suspense>
  );
}