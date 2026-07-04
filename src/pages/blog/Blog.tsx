import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { BlogPost } from '../../types'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-display text-4xl mb-10">Recursos para tu bienestar</h1>
      {loading && <p>Cargando artículos...</p>}
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="border-t border-ink/20 pt-4 block"
          >
            <h3 className="font-display text-xl mb-2">{post.titulo}</h3>
            <p className="text-sm text-ink/70">{post.resumen}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
