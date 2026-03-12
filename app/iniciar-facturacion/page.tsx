import Link from "next/link";

export default function BillingStartPage() {
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
            Completa esta información para simular el inicio del proceso de
            facturación dentro del portal. Esta pantalla es visual y todavía no
            realiza validaciones ni envíos reales.
          </p>
        </div>

        <form style={{ display: "grid", gap: "20px" }}>
          <label style={{ display: "grid", gap: "8px", color: "#14324b" }}>
            <span style={{ fontWeight: 600 }}>Número de folio o ticket</span>
            <input
              type="text"
              placeholder="Ingresa tu número de folio o ticket"
              style={{
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #c9d7e6",
                fontSize: "1rem",
                color: "#14324b",
                backgroundColor: "#fbfdff"
              }}
            />
          </label>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
              paddingTop: "8px"
            }}
          >
            <Link
              href="/resultado-validacion"
              style={{
                borderRadius: "999px",
                background: "linear-gradient(135deg, #0f5b8d 0%, #1f7aa5 100%)",
                color: "#ffffff",
                padding: "16px 28px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 14px 32px rgba(15, 91, 141, 0.24)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Continuar
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
              Regresar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}