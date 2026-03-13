import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Facturación en línea",
  description: "Portal de facturación en línea de Grupo Coresa"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <div className="portal-app">
          <header className="portal-header">
            <div className="portal-header__top">
              <div className="portal-shell">
                <Link href="/" className="portal-brand" aria-label="Grupo Coresa">
                  <img
                    className="portal-brand__logo"
                    src="https://4963265.app.netsuite.com/core/media/media.nl?id=2502846&c=4963265&h=XStlSX68j5vbnsFhOdYsRA7rffkCfz3vQriliVhV7YfdsJ__"
                    alt="CORESA"
                  />
                </Link>
              </div>
            </div>

            <div className="portal-header__nav">
              <div className="portal-shell">
                <div className="portal-nav-title">Portal de facturación en línea</div>
                <nav className="portal-nav-links" aria-label="Navegación del portal">
                  <Link href="/">Inicio</Link>
                  <Link href="/iniciar-facturacion">Validar ticket</Link>
                  <Link href="/resultado-validacion">Resultado</Link>
                  <a href="https://www.grupocoresa.com/" target="_blank" rel="noreferrer">
                    Comprar en tienda
                  </a>
                </nav>
              </div>
            </div>
          </header>

          <main className="portal-main">{children}</main>

          <footer className="portal-footer">
            <div className="portal-shell">
              <span>Grupo Coresa · Facturación en línea</span>
              <span>Precisión, confianza y control en cada validación.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}