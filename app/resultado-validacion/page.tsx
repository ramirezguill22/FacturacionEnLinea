import Link from "next/link";

const statusLabelMap: Record<string, string> = {
  encontrado: "Ticket encontrado",
  no_encontrado: "Ticket no encontrado",
  duplicado: "Ticket duplicado",
  no_elegible: "Ticket no elegible",
  error_validacion: "Error de validación",
  error_interno: "Error interno"
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
  const ticketField = resolvedSearchParams.ticketField ?? "";
  const title = statusLabelMap[status] ?? "Resultado disponible";
  const accentColor = success ? "#1f7a4d" : "#9f3a22";
  const accentBackground = success ? "#eefaf3" : "#fff5f2";

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
            background: accentBackground,
            border: `1px solid ${success ? "#c9e9d5" : "#f2d1c8"}`,
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
              color: "#355c7d"
            }}
          >
            Estado mostrado
          </span>

          <strong
            style={{
              fontSize: "1.4rem",
              color: accentColor
            }}
          >
            {title}
          </strong>

          <p
            style={{
              margin: 0,
              color: "#52667a",
              lineHeight: 1.7
            }}
          >
            {message}
          </p>
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          <div
            style={{
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid #d7e4f0",
              backgroundColor: "#fbfdff",
              color: "#14324b",
              fontWeight: 600
            }}
          >
            Estado: {status}
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

          {ticketField ? (
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b"
              }}
            >
              Campo de búsqueda: {ticketField}
            </div>
          ) : null}
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
            href="/iniciar-facturacion"
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
            Capturar otro ticket
          </Link>

          <Link
            href="/"
            style={{
              color: "#355c7d",
              fontWeight: 600,
              textDecoration: "none",
              padding: "12px 4px"
            }}
          >
            Regresar al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}