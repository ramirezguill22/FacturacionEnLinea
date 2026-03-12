content = """# agents.md

## Objetivo general

Construir una **prueba mínima funcional** de una aplicación web usando **Next.js** para ser desplegada posteriormente en **Firebase App Hosting**.

La finalidad de esta fase es únicamente validar que:

1. la aplicación se crea correctamente,
2. la página principal renderiza sin errores,
3. el contenido visible muestre el título **"Facturación en línea"**,
4. el proyecto queda listo para subirse a GitHub y desplegarse en Firebase App Hosting.

---

## Alcance de esta prueba

Esta prueba es **mínima** y **controlada**.

### Sí debe incluir
- un proyecto nuevo de **Next.js**
- una página principal funcional
- el título visible: **Facturación en línea**
- un texto secundario simple indicando que es una prueba mínima
- estructura limpia y comprensible
- instrucciones básicas para ejecución local

### No debe incluir
- autenticación
- conexión con NetSuite
- API backend
- formularios de captura
- conexión a base de datos
- estilos complejos
- Tailwind personalizado innecesario
- lógica de facturación real
- librerías adicionales que no sean necesarias para la prueba mínima

---

## Filosofía de trabajo

Trabajar de forma **incremental, controlada y sin sobreingeniería**.

Copilot debe:
- hacer solo lo que se solicita en esta fase
- no agregar componentes no pedidos
- no inventar integraciones futuras
- no adelantar fases
- mantener el proyecto simple, limpio y funcional
- priorizar claridad sobre sofisticación

---

## Stack objetivo

- **Frontend:** Next.js
- **Objetivo de despliegue posterior:** Firebase App Hosting
- **Lenguaje recomendado:** TypeScript si el template lo crea por defecto
- **Estilo:** mínimo, inline o simple, sin dependencias innecesarias

---

## Resultado esperado

Al ejecutar localmente el proyecto, la página principal debe mostrar claramente:

# Facturación en línea

y debajo un texto simple como:

Prueba mínima para Firebase App Hosting.

---

## Estructura esperada del proyecto

Si el proyecto usa App Router de Next.js, la página principal debe vivir en:

```text
app/page.tsx
```

---

## Definicion oficial de ticket

1. El ticket NO es un registro independiente en NetSuite.
2. El ticket NO es una factura.
3. El ticket NO es un custom record.
4. El ticket es un valor almacenado dentro de una Orden de Venta de NetSuite.
5. El campo exacto donde vive ese valor es `custbody_ticket_venta`.
6. Cuando el usuario captura un numero de ticket en el portal, el sistema debe buscar una Orden de Venta cuyo campo `custbody_ticket_venta` coincida con el valor capturado.
7. La busqueda debe realizarse contra el registro Sales Order.
8. La logica oficial inicial del proyecto debe partir del campo `custbody_ticket_venta` de la Orden de Venta.

## Definicion sobre la longitud del ticket

1. Actualmente, la referencia base del ticket es de 20 caracteres.
2. Esta longitud no debe tratarse como un valor fijo o hardcodeado.
3. La longitud del ticket debe manejarse como una variable configurable.
4. La implementacion debe quedar preparada para que, si en el futuro la longitud cambia y pasa a ser mayor a 20 caracteres, no sea necesario redisenar la solucion.
5. Cualquier validacion de longitud debe depender de una variable de configuracion y no de un numero fijo escrito directamente en la logica.

## Aclaracion sobre criterios de busqueda futuros

1. Aunque la definicion oficial inicial del ticket se basa en el valor almacenado en el campo `custbody_ticket_venta` de la Orden de Venta, la solucion debe quedar preparada para que en el futuro puedan agregarse otros campos de la misma Orden de Venta como criterios complementarios de busqueda o validacion.
2. En esta fase inicial, el criterio principal de busqueda es `custbody_ticket_venta`.
3. La implementacion no debe disenarse de forma rigida o cerrada a un unico campo permanente.
4. Debe quedar preparada para crecer de forma ordenada si mas adelante se requieren otros criterios adicionales sobre la Orden de Venta.