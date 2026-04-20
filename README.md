# Facturacion en linea

Portal web en Next.js para validar tickets de facturacion contra un backend intermedio y una integracion con NetSuite.

## Estado actual

- Landing principal en `/`
- Pantalla de captura en `/iniciar-facturacion`
- Pantalla de resultado en `/resultado-validacion`
- Ruta interna del frontend en `POST /api/tickets/validar`
- Backend Express desplegable en Cloud Run
- Integracion real con NetSuite desde el backend
- Precarga opcional del ticket por URL en `/iniciar-facturacion?ticket=VALOR_CAPTURADO`
- Captura manual del ticket preservada como flujo principal y editable

## Flujo funcional actual

1. El usuario abre el portal.
2. Captura manualmente su ticket o entra con una URL que ya trae `ticket` como query param.
3. El frontend llama a `POST /api/tickets/validar`.
4. El backend consulta NetSuite y devuelve una respuesta normalizada.
5. La UI muestra el resultado en la pantalla de validacion.

## Ejecucion local del frontend

```bash
npm install
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

Ejemplo de precarga por URL:

```text
http://localhost:3000/iniciar-facturacion?ticket=294411548332216498
```

## Nota sobre QR

El QR no invoca directamente el endpoint `POST /api/tickets/validar`.
Debe abrir una URL del portal en `/iniciar-facturacion` con el ticket en el query string. La pagina precarga ese valor y conserva la edicion manual antes de enviar.