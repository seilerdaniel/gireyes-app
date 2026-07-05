import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) setDone(true)
  }

  if (done) {
    return (
      <section className="max-w-md mx-auto px-6 py-24 text-center">
        <p>Revisá tu email para confirmar tu cuenta.</p>
      </section>
    )
  }

  return (
    <section className="max-w-md mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-8">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/20 rounded-xl px-4 py-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/20 rounded-xl px-4 py-3"
        />
        <button className="bg-orquidea text-linen px-6 py-3 rounded-xl font-semibold w-full">
          Crear cuenta
        </button>
      </form>
    </section>
  )
}
