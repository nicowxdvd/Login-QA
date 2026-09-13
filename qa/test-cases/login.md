# Casos de prueba — Login

Aplicación bajo prueba: http://localhost:3000
API de autenticación: http://localhost:3001

## TC-001 — Inicio de sesión con correo inválido

**Precondiciones**

- La aplicación Next.js está corriendo en http://localhost:3000.
- La API de autenticación NestJS está corriendo en http://localhost:3001.

**Datos de prueba**

| Campo      | Valor          |
| ---------- | -------------- |
| Correo     | `abc@nm.cmlp`  |
| Contraseña | `Abc_123_`     |

**Pasos**

1. Abrir http://localhost:3000.
2. Escribir `abc@nm.cmlp` en el campo "Correo electrónico".
3. Escribir `Abc_123_` en el campo "Contraseña".
4. Pulsar el botón "Iniciar sesión".

**Resultado esperado**

- Se muestra un mensaje de error visible en el formulario.
- La aplicación permanece en la pantalla de login y no navega a `/dashboard`.
