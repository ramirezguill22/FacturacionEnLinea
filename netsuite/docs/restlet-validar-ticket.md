# RESTlet de validacion de ticket

Esta carpeta contiene la implementacion base del RESTlet de NetSuite para la Fase 3.

## Archivos

- `src/restlets/validarTicketRestlet.js`: punto de entrada del RESTlet
- `src/services/ticketSearchService.js`: servicio de busqueda en `Sales Order`

## Comportamiento

El RESTlet:

- recibe un `ticket` o `numeroTicket`
- busca en `Sales Order`
- filtra por `custbody_ticket_venta`
- devuelve JSON controlado para:
  - `encontrado`
  - `no_encontrado`
  - `duplicado`
  - `error_interno`

Tambien devuelve `error_validacion` si no recibe un ticket utilizable.

## Payload de prueba

```json
{
  "numeroTicket": "VALOR_CAPTURADO"
}
```

## Datos sugeridos para prueba en NetSuite

- un `Sales Order` con un valor unico en `custbody_ticket_venta`
- un valor inexistente para probar `no_encontrado`
- dos `Sales Order` con el mismo `custbody_ticket_venta` para probar `duplicado`

## Matriz de validacion minima

### Caso 1. Encontrado

Precondicion:

- existe un `Sales Order` con un valor unico en `custbody_ticket_venta`

Request:

```json
{
  "numeroTicket": "VALOR_EXISTENTE_UNICO"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "status": "encontrado",
  "message": "Ticket localizado correctamente.",
  "ticket": "VALOR_EXISTENTE_UNICO",
  "salesOrderId": "12345",
  "salesOrderTranId": "SO106789"
}
```

### Caso 2. No encontrado

Precondicion:

- no existe ningun `Sales Order` con ese valor en `custbody_ticket_venta`

Request:

```json
{
  "numeroTicket": "VALOR_INEXISTENTE"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "status": "no_encontrado",
  "message": "No se encontró una Orden de Venta con ese ticket.",
  "ticket": "VALOR_INEXISTENTE"
}
```

### Caso 3. Duplicado

Precondicion:

- existen dos o mas `Sales Order` con el mismo valor en `custbody_ticket_venta`

Request:

```json
{
  "numeroTicket": "VALOR_DUPLICADO"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "status": "duplicado",
  "message": "Se encontraron múltiples Ordenes de Venta con el mismo ticket.",
  "ticket": "VALOR_DUPLICADO",
  "matches": 2
}
```

### Caso 4. Error de validacion

Request:

```json
{}
```

Respuesta esperada:

```json
{
  "ok": false,
  "status": "error_validacion",
  "message": "Debe enviarse un número de ticket válido.",
  "ticketField": "custbody_ticket_venta"
}
```

### Caso 5. Error interno

Objetivo:

- confirmar que cualquier excepcion en NetSuite se transforma en `error_interno`

Forma de validarlo:

- provocar temporalmente una condicion de error controlada en el script o en el servicio solo dentro de ambiente de prueba
- verificar que la salida siga siendo JSON controlado

Respuesta esperada:

```json
{
  "ok": false,
  "status": "error_interno",
  "message": "Ocurrió un error interno al validar el ticket.",
  "detail": "..."
}
```

## Estado de validacion

- el RESTlet ya fue desplegado en NetSuite en ambiente de prueba
- ya se confirmó al menos una ejecución exitosa desde Postman
- los casos restantes deben validarse con datos controlados en `Sales Order` antes de conectar Cloud Run con NetSuite

## Revision del contrato actual

El JSON actual del RESTlet ya puede considerarse suficientemente estable para la siguiente fase, con estas condiciones:

- se mantiene el uso de `ok` como indicador general de exito o falla
- se mantiene `status` como campo oficial de estado funcional
- se mantiene `message` como mensaje principal de salida
- los casos de exito y error conservan una estructura consistente
- cualquier normalizacion adicional para el frontend debe ocurrir en Cloud Run, no en NetSuite

En consecuencia, a partir de este punto el contrato del RESTlet debe tratarse como congelado para la integracion con Cloud Run, salvo que aparezca una necesidad funcional nueva claramente justificada.

## Contrato congelado del RESTlet

### Caso `encontrado`

```json
{
  "ok": true,
  "status": "encontrado",
  "message": "Ticket localizado correctamente.",
  "ticket": "VALOR_CAPTURADO",
  "salesOrderId": "12345",
  "salesOrderTranId": "SO106789"
}
```

Reglas:

- `ok` debe ser `true`
- `status` debe ser `encontrado`
- `ticket` debe regresar el valor recibido
- `salesOrderId` y `salesOrderTranId` deben venir cuando exista coincidencia unica

### Caso `no_encontrado`

```json
{
  "ok": true,
  "status": "no_encontrado",
  "message": "No se encontró una Orden de Venta con ese ticket.",
  "ticket": "VALOR_CAPTURADO"
}
```

Reglas:

- `ok` debe ser `true`
- `status` debe ser `no_encontrado`
- `ticket` debe regresar el valor buscado
- no deben enviarse `salesOrderId` ni `salesOrderTranId`

### Caso `duplicado`

```json
{
  "ok": true,
  "status": "duplicado",
  "message": "Se encontraron múltiples Ordenes de Venta con el mismo ticket.",
  "ticket": "VALOR_CAPTURADO",
  "matches": 2
}
```

Reglas:

- `ok` debe ser `true`
- `status` debe ser `duplicado`
- `matches` debe indicar el numero total de coincidencias
- no deben enviarse `salesOrderId` ni `salesOrderTranId`

### Caso `error_validacion`

```json
{
  "ok": false,
  "status": "error_validacion",
  "message": "Debe enviarse un número de ticket válido.",
  "ticketField": "custbody_ticket_venta"
}
```

Reglas:

- `ok` debe ser `false`
- `status` debe ser `error_validacion`
- `ticketField` debe identificar el campo oficial usado para la búsqueda

### Caso `error_interno`

```json
{
  "ok": false,
  "status": "error_interno",
  "message": "Ocurrió un error interno al validar el ticket.",
  "detail": "..."
}
```

Reglas:

- `ok` debe ser `false`
- `status` debe ser `error_interno`
- `detail` puede variar según la excepción capturada en NetSuite

## Criterios para Cloud Run

Cloud Run debe asumir que este contrato ya es estable y debe:

- consumir `status` como valor oficial proveniente de NetSuite
- normalizar la respuesta para el frontend sin cambiar el significado funcional
- evitar depender de mensajes internos distintos a los documentados aqui

## Respuesta esperada de ejemplo

```json
{
  "ok": true,
  "status": "encontrado",
  "message": "Ticket localizado correctamente.",
  "ticket": "VALOR_CAPTURADO",
  "salesOrderId": "12345",
  "salesOrderTranId": "SO106789"
}
```