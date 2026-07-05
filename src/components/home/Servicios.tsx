import { Link } from 'react-router-dom'

export default function Servicios() {
  return (
    <section id="servicios" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-orquidea text-sm block mb-3">Servicios</span>
          <h2 className="font-display text-3xl md:text-4xl">Elegí el camino que necesitás hoy</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-ink/10 p-9">
            <h3 className="font-display text-xl mb-3">Coaching Individual</h3>
            <p className="text-sm text-ink/70 mb-5">
              Acompañamiento personalizado para recuperar claridad emocional, soltar la
              culpa y tomar decisiones desde la autenticidad.
            </p>
            <Link to="/tienda" className="text-orquidea font-semibold text-sm">
              Ver detalle →
            </Link>
          </div>

          <div className="border border-ink/10 p-9">
            <h3 className="font-display text-xl mb-3">Asesoría de Imagen</h3>
            <p className="text-sm text-ink/70 mb-5">
              Alineá tu imagen externa con tu identidad interna. Un proceso con enfoque
              emocional, no solo estético.
            </p>
            <Link to="/tienda" className="text-orquidea font-semibold text-sm">
              Ver detalle →
            </Link>
          </div>

          <div className="bg-ink text-linen p-9 relative">
            <span className="absolute -top-3 left-7 bg-orquidea text-linen text-xs uppercase tracking-wide px-3 py-1 rounded-full">
              Recomendado
            </span>
            <h3 className="font-display text-xl mb-3">Programa Integral</h3>
            <p className="text-sm text-linen/80 mb-5">
              Coaching + Asesoría de Imagen combinados en un proceso de 8 a 12 semanas.
              La transformación completa: por dentro y por fuera.
            </p>
            <Link to="/tienda" className="text-gold font-semibold text-sm">
              Ver detalle →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
