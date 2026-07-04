# Giselle Reyes — Método Esencia

Landing + Blog + Tienda + Cursos (LMS). Vite + React + TypeScript + Tailwind v4 + Supabase.

## 1. Qué instalar en tu computadora (una sola vez)

- **Node.js** 18 o superior → https://nodejs.org (LTS recomendado)
- **Git** → https://git-scm.com
- **VS Code** (o el editor que prefieras)
- Cuenta de **GitHub** → https://github.com
- Cuenta de **Supabase** → https://supabase.com
- Cuenta de **Mercado Pago Developers** → https://www.mercadopago.com.ar/developers
- Cuenta de **Stripe** → https://dashboard.stripe.com/register
- Cuenta de **Bunny.net** (video) → https://bunny.net (alternativa más simple: Vimeo Pro)

## 2. Crear el repositorio en GitHub

```bash
git init
git add .
git commit -m "Scaffold inicial: Vite + React + Tailwind + Supabase"

# En GitHub.com: crear un repo nuevo vacío (sin README) llamado gireyes-app
git remote add origin https://github.com/TU-USUARIO/gireyes-app.git
git branch -M main
git push -u origin main
```

## 3. Instalar dependencias del proyecto

```bash
cd gireyes-app
npm install
```

Ya vienen configurados en `package.json`:
- `react-router-dom` → ruteo entre páginas
- `zustand` → estado global (carrito)
- `@supabase/supabase-js` → conexión a base de datos, auth y storage
- `@stripe/stripe-js` → pagos internacionales
- `tailwindcss` + `@tailwindcss/vite` → estilos

Falta instalar el SDK de Mercado Pago:

```bash
npm install mercadopago
```

## 4. Configurar Supabase

1. Creá un proyecto nuevo en https://supabase.com/dashboard
2. Andá a Project Settings → API y copiá el Project URL y la anon public key
3. Copiá `.env.example` a `.env` y completá esos valores:

```bash
cp .env.example .env
```

4. En el SQL Editor de Supabase, creá las tablas del modelo de datos:
   - profiles, services, orders, order_items
   - courses, modules, quizzes, quiz_attempts, enrollments, module_progress, certificates
   - blog_posts

   (Puedo armarte el script SQL completo cuando quieras avanzar a esa parte)

5. Activá Row Level Security (RLS) en todas las tablas y definí políticas.

## 5. Configurar pagos

Mercado Pago: credenciales de prueba en el panel de developers. Necesita una Supabase Edge Function que cree la preferencia de pago (no se hace de forma segura solo desde el frontend).

Stripe: claves de prueba en el dashboard. También requiere una Edge Function para crear la Checkout Session.

Ambos flujos necesitan un webhook (Edge Function de Supabase) que escuche la confirmación de pago y actualice orders.estado y cree el enrollment si corresponde.

## 6. Configurar video (Bunny.net Stream)

1. Creá una cuenta y una Video Library en https://bunny.net
2. Subí los videos de cada módulo ahí
3. Activá Token Authentication para que las URLs sean firmadas
4. Guardá el Library ID en tu .env

## 7. Correr el proyecto en desarrollo

```bash
npm run dev
```

Se abre en http://localhost:5173

## 8. Estructura del proyecto

```
src/
  components/       componentes compartidos (Layout, etc.)
  pages/
    blog/           listado y detalle de artículos
    tienda/         catálogo y detalle de servicios
    cursos/         catálogo y landing de cursos
    cuenta/         dashboard, módulos, certificado (requieren login)
  store/
    cartStore.ts    estado del carrito (persistido en localStorage)
  lib/
    supabase.ts     cliente de Supabase
  types/
    index.ts        tipos compartidos (Service, Course, Module, Quiz, etc.)
```

## 9. Deploy

Recomendado: Vercel o Netlify (deploy automático desde GitHub).

```bash
npm run build
```

Configurá las mismas variables de entorno en el panel de Vercel/Netlify.

## 10. Próximos pasos pendientes (marcados como TODO en el código)

- [ ] Migrar el contenido completo del HTML estático a componentes de cada sección
- [ ] Script SQL de creación de tablas + políticas RLS
- [ ] Edge Functions: preferencia de Mercado Pago, Checkout Session de Stripe, webhooks
- [ ] Lógica de desbloqueo de módulos y quizzes
- [ ] Generación de certificado en PDF
- [ ] Formulario de contacto conectado a Supabase o a un servicio de email
