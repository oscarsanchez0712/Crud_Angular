# Sistema de Gestión de Incidencias

Reto individual S06 | AP4 – Preparándonos para la Hackathon.
Aplicación web CRUD desarrollada con **Angular 19 + TypeScript**, 100% front-end (sin back-end).
Los datos se guardan en el navegador (`localStorage`), con 3 incidencias de ejemplo al iniciar.

## Funcionalidades

1. **Listar:** tabla con código, título, prioridad, estado, fecha y responsable.
2. **Registrar:** formulario reactivo con validaciones activas.
3. **Visualizar:** pantalla con el detalle completo de la incidencia.
4. **Actualizar:** edición de incidencias existentes.
5. **Eliminar:** borrado con ventana de confirmación previa.
6. **Buscar y filtrar:** por título, prioridad o estado.

## Estructura de datos

| Campo | Descripción |
|-------|-------------|
| Código | Identificador único (INC-001, INC-002...), se genera solo |
| Título | Asunto breve |
| Descripción | Detalle técnico |
| Responsable | Técnico asignado |
| Prioridad | Alta, Media, Baja |
| Estado | Pendiente, En proceso, Resuelta |
| Fecha | Registro inicial (automática) |

## Validaciones del formulario

- Título: obligatorio, entre 5 y 80 caracteres.
- Descripción: obligatoria, entre 10 y 500 caracteres.
- Prioridad y estado: obligatorios.
- Responsable: obligatorio, mínimo 3 caracteres, solo letras.
- No se aceptan textos formados solo por espacios.

## Arquitectura

```
src/app
├── core/       servicios (lógica CRUD) y validadores
├── features/   módulo de incidencias (lista, formulario, detalle)
├── layout/     barra lateral de navegación
├── models/     interfaces y tipos
└── shared/     badge y diálogo de confirmación reutilizables
```

Flujo: **Componentes** (UI responsive) ⇄ **Servicio** (lógica CRUD) ⇄ **Datos locales** (localStorage).

## Instalación y ejecución

Requisitos: Node.js 18.19+ (recomendado 20) y npm.

```bash
npm install
npm start        # abre http://localhost:4200
npm run build    # genera la carpeta dist/
npm test         # ejecuta las pruebas
```

## Acceso público

Enlace: _(pega aquí el enlace de tu despliegue)_
