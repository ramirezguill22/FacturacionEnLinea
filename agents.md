Plan por fases
Fase 0. Definición funcional y técnica mínima

Objetivo: dejar totalmente claro qué se va a validar en NetSuite antes de escribir integración real.

Entregables

definición exacta del ticket

confirmación de que el valor a buscar es custbody_ticket_venta

confirmación de que vive en Sales Order

definición de reglas de resultado:

encontrado

no encontrado

duplicado

no elegible

definición de respuesta mínima que necesita la UI

Resultado esperado

Un contrato funcional claro del tipo:

qué manda el frontend

qué devuelve Cloud Run

qué devuelve NetSuite

Fase 1. UI del flujo inicial del portal

Objetivo: dejar lista la experiencia visual base.

Alcance

landing principal

página de captura de ticket
# Plan por fases

## Fase 0. Definición funcional y técnica mínima

Objetivo: dejar totalmente claro qué se va a validar en NetSuite antes de escribir integración real.

### Entregables

- definición exacta del ticket
- confirmación de que el valor a buscar es `custbody_ticket_venta`
- confirmación de que vive en `Sales Order`
- definición de reglas de resultado:
	- encontrado
	- no encontrado
	- duplicado
	- no elegible
- definición de respuesta mínima que necesita la UI

### Resultado esperado

Un contrato funcional claro del tipo:

- qué manda el frontend
- qué devuelve Cloud Run
- qué devuelve NetSuite

## Fase 1. UI del flujo inicial del portal

Objetivo: dejar lista la experiencia visual base.

### Alcance

- landing principal
- página de captura de ticket
- navegación entre ambas
- mensajes visuales básicos

### Sin incluir todavía

- NetSuite real
- Cloud Run real
- autenticación
- datos fiscales
- creación de factura

### Resultado esperado

Un flujo visual funcional:

- Inicio
- Captura de ticket
- área donde luego se mostrará el resultado

## Fase 2. API intermedia base en Cloud Run

Objetivo: crear la capa backend intermedia, aunque al inicio sea con respuesta simulada.

### Alcance

- proyecto backend base
- despliegue en Cloud Run
- endpoint inicial:

```text
POST /api/tickets/validar
```

- validación de entrada
- estructura estándar de respuesta JSON
- logs básicos

### Sin incluir todavía

- conexión real a NetSuite

### Resultado esperado

La UI ya puede llamar a Cloud Run y recibir una respuesta mock controlada.

## Fase 3. RESTlet en NetSuite para búsqueda de ticket

Objetivo: construir la lógica real dentro de NetSuite.

### Alcance

- RESTlet
- búsqueda de orden de venta
- filtro por:
	- `custbody_ticket_venta`
- validación de:
	- una coincidencia
	- cero coincidencias
	- múltiples coincidencias
- respuesta JSON controlada

### Resultado esperado

NetSuite ya puede responder:

- ticket encontrado
- ticket no encontrado
- ticket duplicado
- error interno

## Fase 4. Integración real Cloud Run ↔ NetSuite

Objetivo: conectar la API intermedia con el RESTlet real.

### Alcance

- autenticación segura hacia NetSuite
- variables de entorno / secretos
- cliente HTTP en Cloud Run
- manejo de errores
- normalización de respuesta

### Resultado esperado

Cuando la UI mande el ticket:

- Cloud Run consulta NetSuite
- recibe respuesta real
- devuelve un JSON limpio al frontend

## Fase 5. Integración real Frontend ↔ Cloud Run

Objetivo: hacer que la pantalla del portal consulte en tiempo real.

### Alcance

- consumir `POST /api/tickets/validar`
- mostrar loading
- mostrar resultado:
	- encontrado
	- no encontrado
	- error
- bloquear submit duplicado
- mensajes amigables

### Resultado esperado

El usuario ya puede capturar un ticket y saber si existe en NetSuite.

## Fase 6. Reglas de elegibilidad del ticket

Objetivo: dejar de validar solo existencia y empezar a validar negocio.

### Alcance

Definir y programar reglas como:

- la orden no debe estar cancelada
- no debe estar ya facturada
- debe estar dentro de vigencia
- debe pertenecer a un canal válido
- debe cumplir cualquier otra regla del proceso

### Resultado esperado

La respuesta ya no será solo “existe”, sino algo como:

- encontrado y elegible
- encontrado pero ya facturado
- encontrado pero no elegible
- no encontrado

## Fase 7. Pantalla de datos fiscales

Objetivo: continuar el flujo solo si el ticket es válido.

### Alcance

- formulario de datos fiscales
- RFC
- razón social
- correo
- uso CFDI
- navegación desde validación exitosa

### Sin incluir todavía

- guardado real en NetSuite
- timbrado

### Resultado esperado

El usuario avanza visualmente después de que el ticket fue validado.

## Fase 8. Resumen y confirmación

Objetivo: mostrar al usuario lo que está a punto de enviar.

### Alcance

- resumen del ticket
- resumen de datos fiscales
- botón de confirmar
- botón de regresar

### Resultado esperado

Una pantalla de confirmación clara antes de crear la solicitud real.

## Fase 9. Creación de solicitud de facturación

Objetivo: comenzar la operación real de negocio.

### Alcance

Puede hacerse de dos maneras:

- crear primero una solicitud
- o crear directamente la factura, según tu diseño

Mi recomendación:
primero una solicitud controlada.

### Resultado esperado

El portal ya no solo valida tickets; ya inicia el proceso real de facturación.

## Fase 10. Generación de factura y estatus

Objetivo: completar el proceso transaccional.

### Alcance

- creación de factura
- timbrado
- estatus del proceso
- manejo de errores
- bitácora

### Resultado esperado

El usuario puede conocer si su factura quedó:

- generada
- en proceso
- con error

## Fase 11. Entrega de archivos y consulta

Objetivo: cerrar el ciclo de autoservicio.

### Alcance

- descarga de PDF
- descarga de XML
- reenvío por correo
- consulta de estatus por folio

### Resultado esperado

Portal de facturación funcional de punta a punta.

## Orden recomendado real

Yo avanzaría así:

### Etapa 1

- Fase 0
- Fase 1
- Fase 2

### Etapa 2

- Fase 3
- Fase 4
- Fase 5

### Etapa 3

- Fase 6
- Fase 7
- Fase 8

### Etapa 4

- Fase 9
- Fase 10
- Fase 11

## MVP más inteligente

Si quieres ir por valor real rápido, el MVP sería cerrar solo esto:

### MVP

- Fase 0
- Fase 1
- Fase 2
- Fase 3
- Fase 4
- Fase 5

Con eso ya tendrías:

- portal visible
- captura de ticket
- consulta real a NetSuite
- respuesta real al usuario

Y eso ya sería un avance muy serio.