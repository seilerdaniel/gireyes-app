import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      return
    }
    navigate('/mi-cuenta')
  }

  return (
    <section className="max-w-md mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-8">Ingresar</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/20 px-4 py-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/20 px-4 py-3"
        />
        {error && <p className="text-terracotta text-sm">{error}</p>}
        <button className="bg-terracotta text-linen px-6 py-3 font-semibold w-full">
          Ingresar
        </button>
      </form>
    </section>
  )
}
