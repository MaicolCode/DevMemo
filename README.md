# DevMemo: Desarrollador's Code Companion

## Descripción del Proyecto

DevMemo es una aplicación web diseñada para desarrolladores que necesitan mantener un registro detallado de sus notas de código, errores y soluciones. Con DevMemo, podrás:

- 📝 Crear y editar notas de código
- 📝 Documentar errores y sus soluciones
- 📱 Acceder a tus notas desde cualquier lugar
- 👥 Gestionar tu cuenta de forma segura
- 📋 Organizar tus notas en un dashboard

## Tecnologías Utilizadas

- **Frontend & Backend**: [Next.js](https://nextjs.org/) 14
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Autenticación**: [Clerk](https://clerk.com/)
- **Base de Datos**: [Supabase](https://supabase.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: React Hook Form
- **Type Safety**: TypeScript

## Características Principales

- 📝 Sistema de notas con soporte para texto enriquecido
- 📋 Dashboard personalizado para gestionar tus notas
- 📝 Formularios intuitivos para crear y editar notas
- 🌐 Acceso multiplataforma
- 👥 Autenticación segura con Clerk
- 🔄 Actualizaciones en tiempo real con Supabase

## Estructura del Proyecto

```
src/
├── app/
│   ├── dashboard/
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [noteId]/
│   │       └── edit/
│   │           └── page.tsx
│   ├── ui/
│   │   └── FormTextArea.tsx
│   └── layout.tsx
└── ...
```

## Comenzando

Primero, instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Requisitos del Sistema

- Node.js 18 o superior
- npm 8 o superior
- Una cuenta en Supabase
- Una cuenta en Clerk

## Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, crea un issue para discutir cambios significativos antes de hacer un pull request.

## Licencia

MIT License

## Aprende Más

Para aprender más sobre Next.js, echa un vistazo a los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs)
- [Aprende Next.js](https://nextjs.org/learn)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Clerk](https://clerk.com/docs)

## Despliegue

La aplicación puede ser desplegada en cualquier plataforma que soporte Node.js, como Vercel, Netlify o Railway.
