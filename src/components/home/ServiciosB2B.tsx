import { whatsappLink, whatsappMensajes } from '../../lib/whatsapp'

const servicios = [
  { titulo: 'Desarrollo de Liderazgo', texto: 'Fortalecé tu liderazgo desde la autenticidad, la comunicación asertiva y la inteligencia emocional.' },
  { titulo: 'Integración de Equipos', texto: 'Espacios colaborativos para mejorar la comunicación y fortalecer la cohesión grupal.' },
  { titulo: 'Charlas Motivacionales', texto: 'Encuentros para empresas o grupos de mujeres que buscan inspiración, claridad y herramientas emocionales.' },
  { titulo: 'Asesoría para Marcas', texto: 'Acompaño a marcas de indumentaria femenina a conectar emocionalmente con sus clientas.' },
]

export default function ServiciosB2B() {
  return (
    <section className="bg-ink text-linen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-gold text-sm block mb-3">
            Para empresas y equipos
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            ¿Trabajás en una empresa o liderás un equipo?
          </h2>
          <p className="text-linen/75">
            Espacios pensados para fortalecer liderazgo, comunicación y bienestar
            emocional en entornos profesionales.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-linen/15">
          {servicios.map((s) => (
            <div key={s.titulo} className="bg-ink p-8">
              <h3 className="text-lg mb-2.5">{s.titulo}</h3>
              <p className="text-sm text-linen/70">{s.texto}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={whatsappLink(whatsappMensajes.b2b)}
            target="_blank"
            rel="noreferrer"
            className="border border-linen px-7 py-3.5 rounded-xl font-semibold inline-block hover:bg-linen hover:text-ink transition-colors"
          >
            Consultanos por una propuesta a medida
          </a>
        </div>
      </div>
    </section>
  )
}
