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
    usoCfdi?: string;
    regimenFiscal?: string;
    codigoPostal?: string;
  };
};

function FiscalDataPageContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId")?.trim() ?? "";
  const [result, setResult] = useState<CustomerFiscalInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

          <div className="portal-cta-row">
            <Link href="/iniciar-facturacion" className="portal-button">
              Validar otro ticket
            </Link>
            <Link href="/" className="portal-link-button">
              Regresar al inicio
            </Link>
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