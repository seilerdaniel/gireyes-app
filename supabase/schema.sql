-- ============================================================
-- Giselle Reyes — Método Esencia
-- Script de creación de tablas + Row Level Security (RLS)
-- Ejecutar completo en Supabase → SQL Editor → New Query
-- ============================================================

-- Extensión necesaria para generar UUIDs
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. PROFILES — datos extendidos del usuario (además de auth.users)
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  email text,
  rol text default 'cliente' check (rol in ('cliente', 'admin')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "El usuario ve su propio perfil"
  on profiles for select
  using (auth.uid() = id);

create policy "El usuario edita su propio perfil"
  on profiles for update
  using (auth.uid() = id);

-- Crea automáticamente un profile cuando alguien se registra
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 2. SERVICES — catálogo de la tienda (sesiones, packs, programas, cursos)
-- ============================================================
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  descripcion text,
  precio_ars numeric not null,
  precio_usd numeric not null,
  tipo text not null check (tipo in ('sesion', 'pack', 'programa', 'curso')),
  imagen_url text,
  activo boolean default true,
  created_at timestamptz default now()
);

alter table services enable row level security;

create policy "Cualquiera puede ver servicios activos"
  on services for select
  using (activo = true);

-- ============================================================
-- 3. ORDERS + ORDER_ITEMS — compras
-- ============================================================
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  total numeric not null,
  moneda text not null check (moneda in ('ars', 'usd')),
  gateway text check (gateway in ('mercadopago', 'stripe')),
  estado text default 'pendiente' check (estado in ('pendiente', 'pagado', 'fallido', 'cancelado')),
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  service_id uuid references services(id),
  cantidad int not null default 1,
  precio_unitario numeric not null
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "El usuario ve sus propias órdenes"
  on orders for select
  using (auth.uid() = user_id);

create policy "El usuario crea sus propias órdenes"
  on orders for insert
  with check (auth.uid() = user_id);

create policy "El usuario ve los items de sus propias órdenes"
  on order_items for select
  using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- 4. COURSES + MODULES — estructura del curso (LMS)
-- ============================================================
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  descripcion text,
  service_id uuid references services(id),
  created_at timestamptz default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  orden int not null,
  titulo text not null,
  video_url text,
  requiere_examen boolean default false,
  unique (course_id, orden)
);

alter table courses enable row level security;
alter table modules enable row level security;

create policy "Cualquiera puede ver el catálogo de cursos"
  on courses for select
  using (true);

create policy "Cualquiera puede ver la lista de módulos"
  on modules for select
  using (true);
  -- Nota: esto expone título/orden de módulos públicamente (útil para mostrar
  -- el temario en la landing del curso). El video_url solo debería resolverse
  -- realmente en el frontend si el usuario tiene un enrollment activo —
  -- validalo en la Edge Function que genera la URL firmada de Bunny.net.

-- ============================================================
-- 5. QUIZZES + QUIZ_ATTEMPTS — exámenes de cada módulo
-- ============================================================
create table quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id) on delete cascade,
  preguntas jsonb not null, -- [{ pregunta, opciones: [], respuesta_correcta: int }]
  nota_minima numeric default 70
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_id uuid references quizzes(id) on delete cascade,
  respuestas jsonb,
  nota numeric,
  aprobado boolean,
  created_at timestamptz default now()
);

alter table quizzes enable row level security;
alter table quiz_attempts enable row level security;

create policy "Cualquiera con enrollment puede ver el quiz"
  on quizzes for select
  using (true);
  -- La validación fuerte de "solo si compró el curso" se hace en la app,
  -- resolviendo el módulo/curso antes de mostrar el quiz.

create policy "El usuario ve sus propios intentos"
  on quiz_attempts for select
  using (auth.uid() = user_id);

create policy "El usuario crea sus propios intentos"
  on quiz_attempts for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- 6. ENROLLMENTS — qué cursos compró cada usuario
-- ============================================================
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  order_id uuid references orders(id),
  created_at timestamptz default now(),
  unique (user_id, course_id)
);

alter table enrollments enable row level security;

create policy "El usuario ve sus propios enrollments"
  on enrollments for select
  using (auth.uid() = user_id);

-- Nota: el INSERT de enrollments lo hace el webhook de pago (Edge Function
-- con service_role key), no el usuario directamente — por eso no hay
-- policy de INSERT para usuarios acá.

-- ============================================================
-- 7. MODULE_PROGRESS — qué módulos completó cada usuario
-- ============================================================
create table module_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  module_id uuid references modules(id) on delete cascade,
  completado boolean default false,
  fecha timestamptz,
  unique (user_id, module_id)
);

alter table module_progress enable row level security;

create policy "El usuario ve su propio progreso"
  on module_progress for select
  using (auth.uid() = user_id);

create policy "El usuario actualiza su propio progreso"
  on module_progress for insert
  with check (auth.uid() = user_id);

create policy "El usuario modifica su propio progreso"
  on module_progress for update
  using (auth.uid() = user_id);

-- ============================================================
-- 8. CERTIFICATES — certificados generados al completar un curso
-- ============================================================
create table certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  fecha_emision timestamptz default now(),
  url_pdf text,
  unique (user_id, course_id)
);

alter table certificates enable row level security;

create policy "El usuario ve sus propios certificados"
  on certificates for select
  using (auth.uid() = user_id);

-- Nota: el INSERT lo hace una Edge Function (con service_role key) al
-- verificar que todos los módulos del curso están completos.

-- ============================================================
-- 9. BLOG_POSTS — artículos del blog
-- ============================================================
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  titulo text not null,
  resumen text,
  contenido text,
  imagen_url text,
  publicado boolean default true,
  fecha timestamptz default now()
);

alter table blog_posts enable row level security;

create policy "Cualquiera puede ver artículos publicados"
  on blog_posts for select
  using (publicado = true);

-- ============================================================
-- 10. LEADS — mensajes del formulario de contacto
-- ============================================================
create table leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  mensaje text,
  created_at timestamptz default now()
);

alter table leads enable row level security;

create policy "Cualquiera puede dejar un mensaje de contacto"
  on leads for insert
  with check (true);

-- No hay policy de SELECT: solo vos (desde el dashboard de Supabase o con
-- la service_role key) podés leer los leads, no queda expuesto públicamente.

-- ============================================================
-- DATOS DE PRUEBA (opcional) — para probar Tienda y Blog ya mismo
-- ============================================================
insert into services (slug, nombre, descripcion, precio_ars, precio_usd, tipo) values
  ('coaching-individual', 'Coaching Individual', 'Acompañamiento personalizado para recuperar claridad emocional, soltar la culpa y tomar decisiones desde la autenticidad.', 30000, 30, 'sesion'),
  ('asesoria-imagen', 'Asesoría de Imagen', 'Alineá tu imagen externa con tu identidad interna. Un proceso con enfoque emocional, no solo estético.', 30000, 30, 'sesion'),
  ('metodo-esencia', 'Programa Integral Método Esencia', 'Coaching + Asesoría de Imagen combinados en un proceso de 8 a 12 semanas.', 210000, 210, 'programa');

insert into blog_posts (slug, titulo, resumen, contenido) values
  ('5-senales-priorizar-bienestar', '5 señales de que necesitás priorizar tu bienestar', '¿Te sentís agotada aunque no hayas hecho tanto? Reconocé las señales antes del burnout.', '<p>Contenido completo del artículo...</p>'),
  ('inteligencia-emocional-liderazgo', 'Inteligencia emocional en el liderazgo femenino', 'Por qué las mujeres líderes necesitan gestionar sus emociones sin culpa.', '<p>Contenido completo del artículo...</p>'),
  ('decisiones-sin-culpa', 'Cómo tomar decisiones sin culpa', 'Ejercicios prácticos para conectar con tu esencia al momento de elegir.', '<p>Contenido completo del artículo...</p>');
