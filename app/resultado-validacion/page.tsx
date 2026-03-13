import Link from "next/link";

type StatusPresentation = {
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
  followUp: string;
};

const statusPresentationMap: Record<string, StatusPresentation> = {
  encontrado: {
    eyebrow: "Ticket localizado",
    title: "Encontramos tu ticket",
    description:
      "Tu ticket fue localizado correctamente. Revisa los datos encontrados antes de continuar con el siguiente paso del proceso.",
    accentColor: "#196b43",
    primaryActionLabel: "Validar otro ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp: ""
  },
  no_encontrado: {
    eyebrow: "Sin coincidencias",
    title: "No encontramos información con ese ticket",
    description:
      "Revisa el número capturado y vuelve a intentarlo. Si el dato es correcto, puede que la orden todavía no esté disponible para consulta.",
    accentColor: "#8a5a12",
    primaryActionLabel: "Capturar otro ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "Verifica que no falten dígitos y que el número coincida exactamente con el comprobante del cliente."
  },
  duplicado: {
    eyebrow: "Revisión requerida",
    title: "Se detectaron múltiples coincidencias",
    description:
      "Encontramos más de una orden asociada al mismo ticket. Este caso necesita revisión antes de continuar con el proceso.",
    accentColor: "#9b4a10",
    primaryActionLabel: "Capturar otro ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "Si este resultado persiste, conviene revisar el dato directamente en el sistema antes de seguir con la solicitud."
  },
  no_elegible: {
    eyebrow: "Validación incompleta",
    title: "El ticket existe, pero no puede continuar",
    description:
      "Localizamos el ticket, pero por ahora no cumple las condiciones necesarias para seguir con el proceso de facturación.",
    accentColor: "#7d4f14",
    primaryActionLabel: "Capturar otro ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "Las reglas de elegibilidad se profundizarán en la siguiente fase del proyecto."
  },
  error_validacion: {
    eyebrow: "Corrección necesaria",
    title: "Revisa el formato del ticket",
    description:
      "El número capturado no cumple el formato mínimo esperado. Corrige el dato y vuelve a intentarlo.",
    accentColor: "#a4412b",
    primaryActionLabel: "Corregir ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "Captura el número completo tal como aparece en el comprobante para evitar una nueva validación fallida."
  },
  error_interno: {
    eyebrow: "Validación no disponible",
    title: "No pudimos validar el ticket por ahora",
    description:
      "El portal no pudo completar la validación en este momento. Intenta nuevamente en unos minutos.",
    accentColor: "#a4412b",
    primaryActionLabel: "Intentar nuevamente",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "Si el problema continúa, conviene revisar la disponibilidad del servicio antes de seguir atendiendo tickets."
  },
  sin_resultado: {
    eyebrow: "Sin consulta previa",
    title: "Aún no hay un resultado disponible",
    description:
      "Primero captura un ticket para que el portal pueda ejecutar la validación y mostrar un resultado real.",
    accentColor: "#355c7d",
    primaryActionLabel: "Capturar ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "La validación comenzará una vez que envíes un número de ticket desde la pantalla anterior."
  }
};

type ValidationResultPageProps = {
  searchParams: Promise<{
    success?: string;
    status?: string;
    message?: string;
    ticket?: string;
    salesOrderId?: string;
    salesOrderTranId?: string;
    matches?: string;
  }>;
};

export default async function ValidationResultPage({
  searchParams
}: ValidationResultPageProps) {
  const resolvedSearchParams = await searchParams;
  const success = resolvedSearchParams.success === "true";
  const status = resolvedSearchParams.status ?? "sin_resultado";
  const message =
    resolvedSearchParams.message ??
    "Aún no hay una validación ejecutada desde la pantalla de captura.";
  const ticket = resolvedSearchParams.ticket ?? "";
  const salesOrderId = resolvedSearchParams.salesOrderId ?? "";
  const salesOrderTranId = resolvedSearchParams.salesOrderTranId ?? "";
  const matches = resolvedSearchParams.matches ?? "";
  const presentation =
    statusPresentationMap[status] ?? statusPresentationMap.sin_resultado;

  const statusTone = success
    ? { background: "#eefaf3", border: "#c9e9d5", color: "#196b43", badge: "#dff4e8" }
    : status === "no_encontrado" || status === "duplicado" || status === "no_elegible"
      ? { background: "#fff8ea", border: "#ecd8a4", color: "#8a5a12", badge: "#fbecc7" }
      : { background: "#fff5f2", border: "#f2d1c8", color: "#a4412b", badge: "#f8ddd6" };

  return (
    <div className="portal-page">
      <section className="portal-grid-two portal-grid-single">
        <div className="portal-card portal-result-card">
          <div className="portal-section-head">
            <span className="portal-eyebrow">Resultado del proceso</span>
            <h1>Resultado de validación</h1>
          </div>

          <div
            className="portal-status-hero"
            style={{
              background: statusTone.background,
              border: `1px solid ${statusTone.border}`
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: presentation.accentColor
              }}
            >
              {presentation.eyebrow}
            </span>

            <strong
              style={{
                fontSize: "1.4rem",
                color: presentation.accentColor
              }}
            >
              {presentation.title}
            </strong>

            <p style={{ margin: 0, color: "#52667a", lineHeight: 1.7 }}>
              {presentation.description}
            </p>

            <div
              className="portal-status-badge"
              style={{ backgroundColor: statusTone.badge, color: statusTone.color }}
            >
              {success ? "Resultado favorable" : "Resultado por revisar"}
            </div>
          </div>

          <div className="portal-result-grid">
            {presentation.followUp ? (
              <div className="portal-detail-card">{presentation.followUp}</div>
            ) : null}
            {ticket || salesOrderTranId || salesOrderId ? (
              <div className="portal-result-summary">
                <div className="portal-result-summary__head">
                  <span className="portal-eyebrow">Datos localizados</span>
                  <strong>Resumen de la orden encontrada</strong>
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

                  {salesOrderId ? (
                    <div className="portal-result-meta">
                      <span className="portal-result-meta__label">Id interno</span>
                      <strong className="portal-result-meta__value">{salesOrderId}</strong>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {matches ? (
              <div className="portal-detail-card">Coincidencias detectadas: {matches}</div>
            ) : null}
          </div>

          <div className="portal-cta-row">
            <Link href={presentation.primaryActionHref} className="portal-button">
              {presentation.primaryActionLabel}
            </Link>
            <Link href={presentation.secondaryActionHref} className="portal-link-button">
              {presentation.secondaryActionLabel}
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
