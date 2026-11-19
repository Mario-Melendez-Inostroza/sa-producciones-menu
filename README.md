# S·A Producciones

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> Sitio web de colaciones caseras y banquetería en La Florida, Santiago.

**Sitio en vivo:** [sa-producciones-menu.vercel.app/](https://sa-producciones-menu.vercel.app/)

## Sobre el proyecto

Sitio para un negocio de colaciones diarias y banquetería para eventos. Presenta el menú del día, la oferta de banquetería y el contacto. Incluye una vista de panel de administración (`AdminPanel`) además del sitio público.

## Funcionalidades

- Sitio público con menú del día, banquetería para eventos y contacto
- Vista de panel de administración (`AdminPanel`)
- Estado compartido con React Context
- Diseño responsive

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | React, TypeScript |
| Estilos | Tailwind CSS |
| Build | Vite |
| Hosting | Vercel |

## Estructura del proyecto

```text
src/
├── components/   componentes de interfaz
├── context/      estado compartido
└── pages/        PublicSite, AdminPanel
docs/ia/          contexto y reglas para trabajar con IA
```

## Cómo ejecutarlo

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # vista previa del build
```

## Despliegue

El sitio se despliega en **Vercel**: cada push a la rama `main` genera un nuevo despliegue de producción.

## Documentación para trabajo con IA

El repositorio incluye el contexto que necesita un asistente de programación (o un nuevo desarrollador) para trabajar con criterio:

- [`AGENTS.md`](AGENTS.md): reglas y comandos para agentes de IA
- [`docs/ia/CONTEXTO.md`](docs/ia/CONTEXTO.md): objetivo, público y alcance del sitio
- [`docs/ia/REGLAS.md`](docs/ia/REGLAS.md): convenciones de código y de contenido
- [`docs/ia/DECISIONES.md`](docs/ia/DECISIONES.md): decisiones técnicas y su motivo
- [`docs/ia/ROADMAP.md`](docs/ia/ROADMAP.md): próximos pasos
- [`docs/ia/FLUJO-DE-TRABAJO.md`](docs/ia/FLUJO-DE-TRABAJO.md) y [`docs/ia/PROMPTS.md`](docs/ia/PROMPTS.md): flujo de trabajo con IA y plantillas de instrucciones

## Autor

**Mario Meléndez** — Estudiante de Ingeniería en Informática (Duoc UC) · Desarrollo web para pymes con **MM Digital Solutions**.
[Perfil de GitHub](https://github.com/Mario-Melendez-Inostroza)
