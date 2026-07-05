# Giselle Reyes — Método Esencia
## Roadmap del proyecto y tareas pendientes

_Actualizado tras la sesión de mejoras de UX, íconos, WhatsApp contextual y modal de tienda._

---

## ✅ Completado en esta sesión

- **WhatsApp con mensajes contextuales**: cada botón que lleva a WhatsApp ahora envía un mensaje pre-armado distinto según de dónde viene el clic (Hero, cada plan de Precios, propuesta B2B, contacto general). Todo centralizado en `src/lib/whatsapp.ts` — si en algún momento cambia el número de WhatsApp, se edita en un solo lugar.
- **Redes sociales reales**: Instagram (`@gireyesimagen`) y TikTok (`@gireyesimagen`) con URLs verdaderas y íconos reales (`react-icons`), tanto en la sección "Conectemos" del Home como en el footer global (antes solo aparecían ahí, ahora en todas las páginas del sitio).
- **Íconos rotos resueltos**: los símbolos de texto (`✆`, `◎`, `in`) se reemplazaron por íconos reales de `react-icons` (WhatsApp, Instagram, TikTok).
- **Ícono del carrito**: ahora es un ícono real (bolsa de compras) con un badge numérico que solo aparece cuando hay productos, en vez del texto `Carrito (0)`.
- **Footer global ampliado**: pasó de una sola línea de copyright a las 3 columnas (Marca / Contacto / Redes) que habíamos definido en la Fase 2 de contenido, visibles en todas las páginas.
- **Modal de servicio en la Tienda**: al hacer clic en "Ver detalle" se abre un modal con descripción completa, precio en ARS/USD, tipo de servicio, métodos de pago aceptados (Mercado Pago / Stripe), y botones "Comprar ahora" / "Agregar al carrito". Se cierra con Escape, clic afuera, o el botón X.
- **Botón "Agregar" rápido**: en la card de cada servicio, sin necesidad de abrir el modal (patrón estándar de e-commerce: acción rápida + opción de ver detalle).

---

## ⚠️ Pendiente inmediato (detectado en la auditoría de hoy)

Cosas chicas, no bloquean nada, pero conviene resolver pronto:

1. **Botón "Descargar gratis" del ebook** todavía apunta a `href="#"` — falta el archivo PDF real del ebook subido a algún storage (podría ser Supabase Storage) y linkeado ahí.
2. **LinkedIn**: lo saqué de las redes sociales porque no me pasaste una URL real (antes tenía un link falso `href="#"`). Si Giselle tiene perfil de LinkedIn, mandámelo y lo agrego junto a Instagram/TikTok.
3. **Los links "Ver detalle" de la sección Servicios en el Home** todavía llevan genéricamente a `/tienda` en vez de al servicio específico (ej. `/tienda/coaching-individual`). Es rápido de resolver ahora que la Tienda ya tiene datos reales.
4. **Formulario de contacto**: el envío no guarda el lead en Supabase todavía (solo redirige a WhatsApp). Falta conectar a la tabla `leads` que ya existe en el schema SQL.
5. **Contraste de textos secundarios** (`text-ink/60` sobre fondos claros) sin verificar formalmente con una herramienta de accesibilidad.

---

## 🔵 Fase 5 — Pagos (Mercado Pago + Stripe)

- Edge Function de Supabase para crear la preferencia de pago de Mercado Pago
- Edge Function para crear la Checkout Session de Stripe
- Webhook que escucha la confirmación de pago de ambos proveedores y:
  - Actualiza `orders.estado` a "pagado"
  - Si el producto comprado es un curso, crea el `enrollment` automáticamente
- Conectar el botón "Comprar ahora" del modal y el checkout real a estas funciones (hoy el Checkout es un mock visual sin conexión real a los gateways)

---

## 🟣 Fase 6 — Sistema de Cursos (LMS)

- Cargar un curso de prueba en Supabase (tabla `courses` + `modules`) para probar el flujo end-to-end
- Implementar la lógica real de desbloqueo progresivo de módulos (ya está el modelo de datos y los comentarios `TODO` en el código explicando la lógica exacta)
- Integrar reproductor de video con Bunny.net Stream (URLs firmadas, para que nadie acceda a un módulo sin haberlo comprado)
- Sistema de quiz por módulo + registro de intentos
- Generación de certificado en PDF al completar el curso

---

## 🟢 Fase 7 — Funcionalidades futuras (mencionadas por vos, a definir en más detalle cuando lleguemos)

### Talleres
Probablemente se modelan como un nuevo servicio en la tienda (similar a "programa" o "pack", pero con fecha/horario fijo en vez de proceso individual). Falta definir: ¿son en vivo (Zoom/Meet)? ¿Tienen cupo limitado? ¿Se graban para verlos después?

### Secciones especiales
Mencionaste esto como algo a futuro pero todavía no tengo el detalle de qué contenido llevarían — lo definimos cuando lo retomemos.

### Blog mejorado + Panel de administración
Esto tiene dos caminos posibles, con esfuerzo muy distinto:

**Opción A — Rápida (cero desarrollo extra):** Giselle escribe y publica artículos directamente desde el **Table Editor de Supabase** (la interfaz web que ya tiene disponible). Es menos cómodo que un editor visual, pero funciona hoy mismo con la tabla `blog_posts` que ya existe.

**Opción B — Panel de administración real:** una pantalla `/admin/blog` dentro del sitio, protegida (solo accesible si `profiles.rol = 'admin'`), con un editor de texto enriquecido (por ejemplo la librería Tiptap) para escribir el artículo con formato, subir la imagen de portada, y publicarlo con un botón — sin tocar Supabase directamente. Esto son varias horas de desarrollo adicionales.

Mi sugerencia: arrancar con la Opción A para no bloquear la publicación de contenido, y construir la Opción B más adelante si el volumen de artículos lo justifica.

---

## 📋 Cómo seguimos

Sugiero este orden para las próximas sesiones:
1. Resolver los 5 puntos de "Pendiente inmediato" (son rápidos)
2. Fase 5 (Pagos) — es lo que falta para que la Tienda funcione de punta a punta con dinero real
3. Fase 6 (Cursos) — cuando tengas el contenido del primer curso listo para cargar
4. Fase 7 — la retomamos cuando tengas más definido el alcance de talleres y secciones especiales
