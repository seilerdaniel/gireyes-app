import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { BlogPost as BlogPostType } from '../../types'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPostType | null>(null)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()
      setPost(data as BlogPostType)
    }
    fetchPost()
  }, [slug])

  if (!post) return <p className="max-w-3xl mx-auto px-6 py-24">Cargando...</p>

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-4xl mb-6">{post.titulo}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.contenido }} />
    </article>
  )
}
