import Link from "next/link";

const statusItems = [
  "encontrado",
  "no encontrado",
  "no elegible"
];

export default function ValidationResultPage() {
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
            Esta pantalla representa la salida visual del portal una vez que se
            procese el número de folio o ticket. Por ahora es un ejemplo estático
            y todavía no depende de una validación real.
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%)",
            border: "1px solid rgba(21, 55, 94, 0.08)",
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
              color: "#14324b"
            }}
          >
            Ejemplo visual de resultado
          </strong>

          <p
            style={{
              margin: 0,
              color: "#52667a",
              lineHeight: 1.7
            }}
          >
            La interfaz queda preparada para mostrar estados como encontrado, no
            encontrado, no elegible y otros que puedan incorporarse más adelante.
          </p>
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {statusItems.map((status) => (
            <div
              key={status}
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                border: "1px solid #d7e4f0",
                backgroundColor: "#fbfdff",
                color: "#14324b",
                fontWeight: 600,
                textTransform: "capitalize"
              }}
            >
              {status}
            </div>
          ))}
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