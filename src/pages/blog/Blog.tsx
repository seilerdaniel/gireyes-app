import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { BlogPost } from '../../types'

function formatFecha(fecha: string) {
  try {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return fecha
  }
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todas')

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('fecha', { ascending: false })
      if (!error && data) setPosts(data as BlogPost[])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(posts.map((p) => p.categoria).filter(Boolean)))
    return ['Todas', ...unicas] as string[]
  }, [posts])

  const postsFiltrados =
    categoriaActiva === 'Todas' ? posts : posts.filter((p) => p.categoria === categoriaActiva)

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-xl mb-10">
        <span className="font-display italic text-orquidea text-sm block mb-3">Blog</span>
        <h1 className="font-display text-4xl mb-3">Recursos para tu bienestar</h1>
        <p className="text-ink/70">Artículos, guías y herramientas para acompañar tu proceso.</p>
      </div>

      {categorias.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                categoriaActiva === cat
                  ? 'bg-orquidea text-linen border-orquidea'
                  : 'border-ink/20 text-ink/70 hover:border-orquidea hover:text-orquidea'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="text-ink/60">Cargando artículos...</p>}

      {!loading && postsFiltrados.length === 0 && (
        <p className="text-ink/60">Todavía no hay artículos en esta categoría.</p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {postsFiltrados.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
            <div className="aspect-[16/10] mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-malva to-plum">
              {post.imagen_url && (
                <img
                  src={post.imagen_url}
                  alt={post.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            {post.categoria && (
              <span className="text-xs uppercase tracking-wide text-orquidea font-semibold">
                {post.categoria}
              </span>
            )}
            <h3 className="font-display text-xl my-2 group-hover:text-orquidea transition-colors">
              {post.titulo}
            </h3>
            <p className="text-sm text-ink/70 mb-2">{post.resumen}</p>
            <p className="text-xs text-ink/50">{formatFecha(post.fecha)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
