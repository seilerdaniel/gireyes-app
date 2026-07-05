import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import type { BlogPost as BlogPostType } from '../../types'

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

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      if (error || !data) {
        setNotFound(true)
      } else {
        setPost(data as BlogPostType)
      }
      setLoading(false)
    }
    fetchPost()
  }, [slug])

  if (loading) {
    return <p className="max-w-3xl mx-auto px-6 py-24 text-ink/60">Cargando artículo...</p>
  }

  if (notFound || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-ink/70 mb-4">No encontramos este artículo.</p>
        <Link to="/blog" className="text-orquidea font-semibold">
          ← Volver al blog
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-orquidea transition-colors mb-8"
      >
        <FiArrowLeft size={16} />
        Volver al blog
      </Link>

      {post.categoria && (
        <span className="text-xs uppercase tracking-wide text-orquidea font-semibold block mb-3">
          {post.categoria}
        </span>
      )}

      <h1 className="font-display text-3xl md:text-4xl mb-3">{post.titulo}</h1>
      <p className="text-sm text-ink/50 mb-8">{formatFecha(post.fecha)}</p>

      {post.imagen_url && (
        <img
          src={post.imagen_url}
          alt={post.titulo}
          className="w-full aspect-[16/9] object-cover rounded-2xl mb-10"
        />
      )}

      <div
        className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-a:text-orquidea"
        dangerouslySetInnerHTML={{ __html: post.contenido }}
      />

      <div className="mt-14 pt-8 border-t border-ink/10">
        <Link to="/blog" className="text-orquidea font-semibold text-sm">
          ← Ver más artículos
        </Link>
      </div>
    </article>
  )
}
