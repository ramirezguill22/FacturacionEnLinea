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