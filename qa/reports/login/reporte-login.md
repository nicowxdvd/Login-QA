# Reporte de pruebas — Login

- **Funcionalidad probada:** Inicio de sesión (pantalla de login, `http://localhost:3000`) y su API de autenticación (`http://localhost:3001`).
- **Fecha de ejecución:** 2026-09-12
- **Ejecutado por:** Nicolas Ibañez (QA)
- **Entorno:** Next.js 16.3.5 (Turbopack) + API NestJS local. Navegador automatizado con Playwright.
- **Usuario de prueba creado:** `qa.tc003@example.com` / `QaTest123` (vía `POST /users`, HTTP 201).

## Resumen

| Métrica | Valor |
| ------- | ----- |
| Casos ejecutados | 7 |
| PASS | 5 |
| FAIL | 2 |
| BLOCKED | 0 |

| Caso | Título | Resultado |
| ---- | ------ | --------- |
| TC-001 | Inicio de sesión con correo inválido | ✅ PASS |
| TC-002 | Inyección SQL en ambos inputs | ✅ PASS |
| TC-003 | Clics repetidos con credenciales válidas | ❌ FAIL |
| TC-004 | Inicio de sesión con Google / Apple | ❌ FAIL |
| TC-005 | Cambio de idioma (correspondencia de textos) | ✅ PASS |
| TC-006 | Revisión ortográfica | ✅ PASS |
| TC-007 | Vista responsive | ✅ PASS |

- **Casos PASS:** TC-001, TC-002, TC-005, TC-006, TC-007
- **Casos FAIL:** TC-003, TC-004
- **Casos BLOCKED:** ninguno

---

## Detalle por caso

### TC-001 — Inicio de sesión con correo inválido ✅ PASS

- **Datos:** correo `abc@nm.cmlp`, contraseña `Abc_123_`.
- **Resultado esperado:** se muestra un mensaje de error visible y la app permanece en login sin navegar a `/dashboard`.
- **Resultado obtenido:** `POST /api/login` → **401**. Se muestra la alerta *"Correo o contraseña incorrectos"* (`role="alert"`). La URL permanece en `/`. Coincide con lo esperado.

### TC-002 — Inyección SQL en ambos inputs ✅ PASS

- **Datos:** correo `' OR '1'='1' --`, contraseña `' OR '1'='1`.
- **Resultado esperado:** sin bypass de autenticación; la app no navega a `/dashboard`.
- **Resultado obtenido:** `POST /api/login` → **400 Bad Request**. La validación Zod rechaza el correo por formato antes de tocar la BD; no hay bypass. Permanece en `/`.
- **Observación (menor, UX):** el mensaje mostrado es el genérico *"Ocurrió un error al iniciar sesión. Intenta de nuevo"* en lugar de un error de formato de correo. El hook `useLogin` solo mapea 401 y 502; los 400 caen en `genericError` (`src/hooks/useLogin.ts:38-44`). No afecta la seguridad, por lo que el caso se considera PASS.

### TC-003 — Clics repetidos con credenciales válidas ❌ FAIL → 🔧 Corregido (cliente)

- **Datos:** usuario `qa.tc003@example.com` / `QaTest123`.
- **Resultado esperado:** una sola acción de login debe generar una única petición y un único inicio de sesión; los clics adicionales deben ignorarse.
- **Resultado obtenido:** una ráfaga de 10 clics generó **10 peticiones `POST /api/login`, todas 200 OK → 10 tokens JWT emitidos** por una sola acción de login.
  - El botón sí se deshabilita con `isLoading`, pero ese guard depende del re-render de React: con clics síncronos no re-renderiza entre clics y el guard se salta por completo.
  - En una prueba con clics espaciados 20 ms (usuario aporreando el botón), el guard bloqueó la mayoría pero **aún se colaron 2 peticiones** (una segunda pasó tras resetear `isLoading` y antes de completar la redirección).
- **Causa raíz:** no hay bloqueo inmediato de doble-envío ni idempotencia en el servidor.
- **Recomendación:** aplicar candado sincrónico en `onSubmit` (p. ej. `useRef`) y/o idempotencia en la API.
- **Evidencia:** `qa/evidence/login/TC-003.png`
- **Remediación aplicada (2026-09-12):** candado sincrónico con `useRef` en `src/hooks/useLogin.ts`. El ref se actualiza al instante (a diferencia de `isLoading`, que depende del re-render), rechaza envíos concurrentes, se mantiene durante un login exitoso (el componente navega a `/dashboard`) y se libera solo en caso de fallo para permitir reintentar.
  - Commit `147dba7` en rama `develop` (feature `feature/prevent-double-login-submit`, merge `--no-ff` `e0795d6`).
  - **Reverificación:** 10 clics síncronos con credenciales válidas → **1 sola** `POST /api/login` + redirección. Credenciales inválidas con 2 clics → 2 × 401 (reintento permitido, sin regresión). `tsc --noEmit` y `eslint` limpios.
  - **Pendiente (servidor):** la idempotencia / rate-limit vive en la API NestJS (`localhost:3001`, repo aparte) y no se aplicó aquí. Un cliente que ignore la UI (cURL, DevTools) todavía puede disparar múltiples logins.

### TC-004 — Inicio de sesión con Google / Apple ❌ FAIL

- **Resultado esperado:** al pulsar "Continuar con Google" o "Continuar con Apple" se inicia el flujo OAuth del proveedor.
- **Resultado obtenido:** al pulsar cualquiera de los dos botones **no ocurre nada**: sin navegación, sin petición de red, sin popup ni pestaña nueva. La URL permanece en `/`.
- **Causa raíz:** los botones son `type="button"` **sin handler `onClick`**; el flujo OAuth no está implementado (`src/components/ui/SocialButton.tsx`, renderizados sin handler en `src/components/LoginForm.tsx`).
- **Evidencia:** `qa/evidence/login/TC-004.png`

### TC-005 — Cambio de idioma ✅ PASS

- **Resultado esperado:** al cambiar ES↔EN todos los textos deben corresponder al idioma seleccionado.
- **Resultado obtenido:** el conmutador cambia correctamente todos los textos del formulario y del banner, y actualiza `<html lang>`. Las claves de traducción están en paridad total: **83 claves en `es.json` y 83 en `en.json`**, sin faltantes ni arrays descuadrados.
- **Observación (menor):** el `<title>` de la pestaña queda fijo en español (*"Iniciar sesión | Capturando Momentos, Creando Recuerdos"*) incluso con `lang="en"`, por estar hardcodeado en `src/app/layout.tsx:17` fuera de i18n. No afecta el contenido de la página, por lo que el caso se considera PASS.

### TC-006 — Revisión ortográfica ✅ PASS

- **Resultado esperado:** los textos visibles no deben tener errores ortográficos.
- **Resultado obtenido:** revisados los textos de `es.json` y `en.json` (login, banner, botones sociales, conmutador y errores). **Sin errores ortográficos** en ninguno de los dos idiomas; acentos, `¿ ¡` y apóstrofes correctos.
- **Observación (cosmética):** dos mensajes en español no cierran con punto final (`networkError`, `genericError`); inconsistencia de estilo, no un error ortográfico.

### TC-007 — Vista responsive ✅ PASS

- **Resultado esperado:** la web se ve correctamente en distintos tamaños de pantalla, sin desbordamiento ni elementos rotos.
- **Resultado obtenido:**

  | Viewport | Layout | Desbordamiento horizontal |
  | -------- | ------ | ------------------------- |
  | Móvil 375×812 | Columna única, panel promocional oculto | Ninguno |
  | Tablet 768×1024 | Dos columnas | Ninguno |
  | Desktop 1280×800 | Split equilibrado | Ninguno |

  Todos los controles quedan accesibles en cada tamaño. Coincide con lo esperado.

---

## Defectos abiertos

| ID | Severidad | Caso | Descripción |
| -- | --------- | ---- | ----------- |
| DEF-01 | Media | TC-003 | Doble-envío: clics repetidos generan múltiples logins / tokens JWT. **Estado:** resuelto en cliente (commit `147dba7`, rama `develop`). Pendiente idempotencia en la API NestJS. |
| DEF-02 | Media (feature) | TC-004 | Login social Google/Apple no implementado (botones sin acción). |
| DEF-03 | Baja | TC-002 | Respuesta 400 muestra mensaje de error genérico en lugar de validación de correo. |
| DEF-04 | Baja | TC-005 | El `<title>` de la pestaña no se traduce al cambiar de idioma. |
| DEF-05 | Cosmética | TC-006 | Mensajes en español sin punto final (inconsistencia de estilo). |
