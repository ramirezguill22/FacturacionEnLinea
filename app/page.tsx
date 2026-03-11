const logoUrl =
  "https://4963265.app.netsuite.com/core/media/media.nl?id=2502846&c=4963265&h=XStlSX68j5vbnsFhOdYsRA7rffkCfz3vQriliVhV7YfdsJ__";

export default function HomePage() {
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
          maxWidth: "960px",
          padding: "56px 48px",
          borderRadius: "28px",
          backgroundColor: "#ffffff",
          boxShadow: "0 24px 70px rgba(18, 38, 63, 0.12)",
          border: "1px solid rgba(21, 55, 94, 0.08)",
          display: "grid",
          gap: "24px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap"
          }}
        >
          <img
            src={logoUrl}
            alt="Logotipo del portal"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
              borderRadius: "16px",
              backgroundColor: "#f8fbff",
              padding: "8px",
              border: "1px solid rgba(21, 55, 94, 0.1)"
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#355c7d"
            }}
          >
            Portal de autoservicio
          </span>
        </div>

        <div style={{ display: "grid", gap: "18px", maxWidth: "640px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              lineHeight: 1.05,
              color: "#14324b"
            }}
          >
            Facturación en línea
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "1.2rem",
              lineHeight: 1.6,
              color: "#355c7d",
              fontWeight: 600
            }}
          >
            Portal de autoservicio para consultar y gestionar el proceso de
            facturación de forma simple, clara y centralizada.
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#52667a"
            }}
          >
            Esta primera interfaz presenta una vista estática del portal con un
            enfoque profesional y ordenado, lista para evolucionar en fases
            posteriores sin agregar todavía lógica operativa.
          </p>
        </div>

        <div>
          <button
            type="button"
            style={{
              border: "none",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #0f5b8d 0%, #1f7aa5 100%)",
              color: "#ffffff",
              padding: "16px 28px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 14px 32px rgba(15, 91, 141, 0.24)"
            }}
          >
            Iniciar facturación
          </button>
        </div>
      </section>
    </main>
  );
}