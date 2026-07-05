-- ============================================================
-- Migración: agrega categoría a blog_posts
-- Ejecutar en Supabase → SQL Editor → New Query
-- (No rompe nada si ya corriste schema.sql antes)
-- ============================================================

alter table blog_posts add column if not exists categoria text default 'Bienestar';

-- Actualiza los 3 artículos de prueba con una categoría, para que el
-- filtro de categorías tenga con qué mostrar algo real de entrada.
update blog_posts set categoria = 'Bienestar' where slug = '5-senales-priorizar-bienestar';
update blog_posts set categoria = 'Liderazgo' where slug = 'inteligencia-emocional-liderazgo';
update blog_posts set categoria = 'Autoconocimiento' where slug = 'decisiones-sin-culpa';
