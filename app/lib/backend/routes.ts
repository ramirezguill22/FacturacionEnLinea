export const backendRoutes = {
  catalogos: {
    usosCfdi: "/api/catalogos/usos-cfdi"
  },
  clientes: {
    datosFiscales: "/api/clientes/datos-fiscales"
  },
  facturas: {
    generar: "/api/facturas/generar"
  },
  tickets: {
    validar: "/api/tickets/validar"
  }
} as const;