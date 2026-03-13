import Link from "next/link";

type StatusPresentation = {
  eyebrow: string;
  title: string;
  description: string;
  accentColor: string;
  accentBackground: string;
  accentBorder: string;
  badgeBackground: string;
  badgeColor: string;
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
    accentBackground: "#eefaf3",
    accentBorder: "#c9e9d5",
    badgeBackground: "#dff4e8",
    badgeColor: "#196b43",
    primaryActionLabel: "Validar otro ticket",
    primaryActionHref: "/iniciar-facturacion",
    secondaryActionLabel: "Regresar al inicio",
    secondaryActionHref: "/",
    followUp:
      "La validación ya fue exitosa. La siguiente pantalla del flujo continuará en la fase de captura de datos fiscales."
  },
  no_encontrado: {
    eyebrow: "Sin coincidencias",
    title: "No encontramos información con ese ticket",
    description:
      "Revisa el número capturado y vuelve a intentarlo. Si el dato es correcto, puede que la orden todavía no esté disponible para consulta.",
    accentColor: "#8a5a12",
    accentBackground: "#fff8e8",
    accentBorder: "#edd9a6",
    badgeBackground: "#fbecc7",
    badgeColor: "#8a5a12",
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
    accentBackground: "#fff4ec",
    accentBorder: "#f1cfb5",
    badgeBackground: "#f9dfcf",
    badgeColor: "#9b4a10",
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
    accentBackground: "#fff6ea",
    accentBorder: "#edd4b0",
    badgeBackground: "#f8e6c9",
    badgeColor: "#7d4f14",
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
    accentColor: "#9f3a22",
    accentBackground: "#fff5f2",
    accentBorder: "#f2d1c8",
    badgeBackground: "#f8ddd6",
    badgeColor: "#9f3a22",
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
    accentColor: "#9f3a22",
    accentBackground: "#fff5f2",
    accentBorder: "#f2d1c8",
    badgeBackground: "#f8ddd6",
    badgeColor: "#9f3a22",
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
    accentBackground: "#f3f8fd",
    accentBorder: "#d7e4f0",
    badgeBackground: "#e7f0f8",
    badgeColor: "#355c7d",
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
    ticketField?: string;
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
            Resultado del proceso
          </span>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              lineHeight: 1.08,
              color: "#14324b"
            }}
          >
            Resultado de validación
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
            Esta pantalla ya muestra el resultado real que devuelve el backend
            del portal después de validar el ticket capturado.
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "20px",
            background: presentation.accentBackground,
            border: `1px solid ${presentation.accentBorder}`,
            display: "grid",
            gap: "14px"
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

          <p
            style={{
              margin: 0,
              color: "#52667a",
              lineHeight: 1.7
            }}
          >
            {presentation.description}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              padding: "10px 14px",
              borderRadius: "999px",
              backgroundColor: presentation.badgeBackground,
              color: presentation.badgeColor,
              fontWeight: 700,
              fontSize: "0.95rem"
            }}
          >
            {success ? "Resultado favorable" : "Resultado por revisar"}
          </div>
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          <div
            style={{
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid #d7e4f0",
              backgroundColor: "#fbfdff",
              color: "#14324b",
              lineHeight: 1.7
            }}
          >
            {presentation.followUp}
          </div>

          {ticket ? (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b"
              }}
            >
              Ticket: {ticket}
            </div>
          ) : null}

          {salesOrderTranId ? (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b"
              }}
            >
              Orden de venta: {salesOrderTranId}
            </div>
          ) : null}

          {salesOrderId ? (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b"
              }}
            >
              Id interno: {salesOrderId}
            </div>
          ) : null}

          {matches ? (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b"
              }}
            >
              Coincidencias detectadas: {matches}
            </div>
          ) : null}

          {message && status === "sin_resultado" ? null : (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#52667a",
                lineHeight: 1.7
              }}
            >
              Referencia del sistema: {message}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <Link
            href={presentation.primaryActionHref}
            style={{
              borderRadius: "999px",
              background: "linear-gradient(135deg, #0f5b8d 0%, #1f7aa5 100%)",
              color: "#ffffff",
              padding: "16px 28px",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 14px 32px rgba(15, 91, 141, 0.24)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {presentation.primaryActionLabel}
          </Link>

          <Link
            href={presentation.secondaryActionHref}
            style={{
              color: "#355c7d",
              fontWeight: 600,
              textDecoration: "none",
              padding: "12px 4px"
            }}
          >
            {presentation.secondaryActionLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}