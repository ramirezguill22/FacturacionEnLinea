import Link from "next/link";
import { PortalCarousel } from "./components/portal-carousel";

const carouselItems = [
  {
    src: "/Imagenes/4.%20ingenierias.jpg",
    alt: "Soluciones de ingeniería CORESA",
    title: "Ingeniería y precisión para cada operación",
    description:
      "El portal conserva la esencia visual de CORESA con una presentación más limpia, especializada y orientada al control del proceso."
  },
  {
    src: "/Imagenes/1.%20extractores.jpg",
    alt: "Equipos extractores CORESA",
    title: "Soporte industrial con enfoque corporativo",
    description:
      "Una experiencia de facturación que se siente parte del ecommerce, pero con una capa más sobria y enfocada en operación."
  },
  {
    src: "/Imagenes/3.%20tuberia%20flexible.jpg",
    alt: "Tubería flexible CORESA",
    title: "Claridad para validar cada ticket",
    description:
      "Toda la navegación fue diseñada para que el usuario identifique rápido el estado de su consulta y actúe con confianza."
  },
  {
    src: "/Imagenes/5.%20sucursales.jpg",
    alt: "Cobertura y sucursales CORESA",
    title: "Respaldo comercial y servicio especializado",
    description:
      "El portal aprovecha la identidad institucional de Grupo Coresa y la traduce a un flujo digital más ordenado y profesional."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="portal-home-hero">
        <PortalCarousel
          items={carouselItems}
          className="portal-carousel--hero"
          showOverlayContent={false}
        />
      </section>

      <div className="portal-page portal-page--home">
        <section className="portal-grid-two portal-grid-two--home-intro">
          <div className="portal-card portal-hero-copy">
            <span className="portal-eyebrow">BIENVENIDO</span>
            <div style={{ display: "grid", gap: "18px" }}>
              <p className="portal-lead">
                1. Prepara tu número de ticket
                <br />
                2. Clic en botón Iniciar facturación
              </p>
            </div>

            <div className="portal-cta-row">
              <Link href="/iniciar-facturacion" className="portal-button">
                Iniciar facturación
              </Link>

              <a className="portal-link-button" href="https://www.grupocoresa.com/" target="_blank" rel="noreferrer">
                Conocer ecommerce CORESA
              </a>
            </div>

            <div className="portal-info-box" />
          </div>

          <div className="portal-card portal-hero-copy portal-home-reference-card">
            <span className="portal-eyebrow">Dónde está mi número de folio o ticket</span>
            <img
              className="portal-home-reference-image"
              src="/Imagenes/DondeEstaElNumero.jpg"
              alt="Referencia de ubicación del número de folio o ticket"
            />
          </div>
        </section>

      </div>
    </>
  );
}