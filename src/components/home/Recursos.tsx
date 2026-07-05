import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { BlogPost } from '../../types'
import ebookCover from '../../assets/images/ebook-cover.jpg'

export default function Recursos() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchLatest() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('fecha', { ascending: false })
        .limit(3)
      if (data) setPosts(data as BlogPost[])
    }
    fetchLatest()
  }, [])

  return (
    <section id="recursos" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-orquidea text-sm block mb-3">Recursos</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Recursos para tu bienestar</h2>
          <p className="text-ink/70">Artículos, guías y herramientas para acompañar tu proceso.</p>
        </div>

        <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-10 items-center bg-malva p-9 mb-14 border border-ink/10">
          <img
            src={ebookCover}
            alt='Ebook "Despierta tu esencia" por Giselle Reyes'
            className="aspect-[3/4] w-full object-cover rounded-2xl"
          />
          <div>
            <span className="bg-orquidea text-linen text-xs uppercase tracking-wide px-3 py-1 rounded-full inline-block mb-3.5">
              Ebook gratuito
            </span>
            <h3 className="font-display text-2xl mb-2.5">Despierta tu esencia</h3>
            <p className="text-ink/70 mb-5">
              Un viaje hacia el ser a través del coaching e imagen.
            </p>
            <a href="#" className="bg-orquidea text-linen px-6 py-3 rounded-xl font-semibold inline-block">
              Descargar gratis
            </a>
          </div>
        </div>

        {/* Fallback estático mientras no haya artículos cargados en Supabase */}
        <div className="grid md:grid-cols-3 gap-7">
          {(posts.length > 0
            ? posts
            : [
                { id: '1', slug: '', titulo: '5 señales de que necesitás priorizar tu bienestar', resumen: '¿Te sentís agotada aunque no hayas hecho tanto? Reconocé las señales antes del burnout.', contenido: '', fecha: '' },
                { id: '2', slug: '', titulo: 'Inteligencia emocional en el liderazgo femenino', resumen: 'Por qué las mujeres líderes necesitan gestionar sus emociones sin culpa.', contenido: '', fecha: '' },
                { id: '3', slug: '', titulo: 'Cómo tomar decisiones sin culpa', resumen: 'Ejercicios prácticos para conectar con tu esencia al momento de elegir.', contenido: '', fecha: '' },
              ]
          ).map((post) => (
            <div key={post.id} className="border-t border-ink/20 pt-4.5">
              <span className="text-xs uppercase tracking-wide text-orquidea">Artículo</span>
              <h4 className="font-display text-lg my-2.5">{post.titulo}</h4>
              <p className="text-sm text-ink/70 mb-3.5">{post.resumen}</p>
              <Link
                to={post.slug ? `/blog/${post.slug}` : '/blog'}
                className="text-orquidea font-semibold text-sm"
              >
                Leer más →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
