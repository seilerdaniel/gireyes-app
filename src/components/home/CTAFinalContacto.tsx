import { useState } from 'react'

export default function CTAFinalContacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: guardar el lead en Supabase (tabla `leads` o similar) antes de redirigir
    const texto = encodeURIComponent(
      `Hola Giselle! Soy ${form.nombre}. ${form.mensaje}`
    )
    window.open(`https://wa.me/5491161948284?text=${texto}`, '_blank')
  }

  return (
    <section id="contacto" className="bg-ink text-linen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-display italic text-gold text-sm block mb-3">
            Este es tu momento
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            Tu bienestar no puede seguir esperando
          </h2>
          <p className="text-linen/75 mb-9">Este es tu momento. Este es tu espacio.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#contacto-form" className="bg-terracotta text-linen px-7 py-3.5 font-semibold">
              Agendar consulta gratuita
            </a>
            <a
              href="https://wa.me/5491161948284"
              target="_blank"
              rel="noreferrer"
              className="border border-linen px-7 py-3.5 font-semibold hover:bg-linen hover:text-ink transition-colors"
            >
              Enviar mensaje por WhatsApp
            </a>
          </div>
        </div>

        <div id="contacto-form" className="max-w-xl mx-auto bg-linen text-ink p-9">
          <h3 className="font-display text-xl mb-1.5">Hablemos de tu proceso</h3>
          <p className="text-sm text-ink/60 mb-6">
            Dejanos tus datos y te contactamos para agendar tu primera sesión.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1.5">Nombre completo *</label>
              <input
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full border border-ink/25 px-3.5 py-3"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border border-ink/25 px-3.5 py-3"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Teléfono (opcional)</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+54 9 11 ..."
                  className="w-full border border-ink/25 px-3.5 py-3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1.5">Contanos un poco sobre vos *</label>
              <textarea
                name="mensaje"
                required
                value={form.mensaje}
                onChange={handleChange}
                placeholder="¿Qué te gustaría trabajar? ¿Coaching, asesoría de imagen, o ambos?"
                className="w-full border border-ink/25 px-3.5 py-3 min-h-[100px]"
              />
            </div>
            <button className="bg-terracotta text-linen w-full py-3.5 font-semibold">
              Enviar y continuar por WhatsApp
            </button>
          </form>
          <p className="text-xs text-ink/50 text-center mt-3.5">
            Al enviar el formulario, serás redirigida a WhatsApp para finalizar tu consulta.
          </p>
        </div>

        <div className="text-center mt-14">
          <span className="font-display italic text-gold text-sm block mb-3">Conectemos</span>
          <div className="flex justify-center gap-5 my-5">
            <a
              href="https://wa.me/5491161948284"
              className="w-11 h-11 border border-linen/40 rounded-full flex items-center justify-center"
            >
              ✆
            </a>
            <a
              href="https://instagram.com/gireyesimagen"
              className="w-11 h-11 border border-linen/40 rounded-full flex items-center justify-center"
            >
              ◎
            </a>
            <a href="#" className="w-11 h-11 border border-linen/40 rounded-full flex items-center justify-center">
              in
            </a>
          </div>
          <p className="text-sm">gireyesimagen@gmail.com</p>
          <p className="text-sm">WhatsApp: +54 9 11 6194 8284</p>
        </div>
      </div>
    </section>
  )
}
