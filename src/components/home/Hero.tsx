import heroImage from '../../assets/images/hero-image.jpg'
import { whatsappLink, whatsappMensajes } from '../../lib/whatsapp'

export default function Hero() {
  return (
    <section className="grid md:grid-cols-[1.1fr_0.9fr] min-h-[90vh]">
      <div className="flex flex-col justify-center px-6 md:px-12 py-16 order-2 md:order-1">
        <span className="font-display italic text-orquidea text-sm tracking-wide mb-4">
          Coaching & Asesoría de Imagen
        </span>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.08] mb-6">
          Sostenés todo.
          <br />
          ¿Quién te sostiene <em className="text-orquidea not-italic">a vos</em>?
        </h1>
        <p className="text-lg text-ink/70 max-w-md mb-8">
          Coaching emocional y asesoría de imagen para mujeres que se postergan.
          Reconectá con tu esencia, por dentro y por fuera.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={whatsappLink(whatsappMensajes.heroConsulta)}
            target="_blank"
            rel="noreferrer"
            className="bg-orquidea text-linen px-7 py-3.5 rounded-xl font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Agendar consulta gratuita
          </a>
          <a
            href="#recursos"
            className="border border-ink px-7 py-3.5 rounded-xl font-semibold hover:bg-ink hover:text-linen transition-colors"
          >
            Descargar ebook gratis
          </a>
        </div>
      </div>
      <div className="order-1 md:order-2 min-h-[340px] md:min-h-0">
        <img
          src={heroImage}
          alt="Giselle Reyes, Coach Profesional y Asesora de Imagen"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </section>
  )
}
