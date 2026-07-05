import testimonialGeorgina from '../../assets/images/testimonial-georgina.jpg'
import testimonialFlor from '../../assets/images/testimonial-flor.jpg'
import testimonialCaro from '../../assets/images/testimonial-caro.jpg'

const testimonios = [
  {
    texto:
      '"Me ayuda mucho en el día a día a elegir la ropa según mi cuerpo, los colores y accesorios que me favorecen más. Me siento mucho más confiada y aparte de ahorrar tiempo al momento de vestirme. Feliz."',
    foto: testimonialGeorgina,
    nombre: 'Georgina Huguetti',
    rol: 'Dermatocosmiatra · @geor.piel',
  },
  {
    texto:
      '"Tuve la oportunidad de disfrutar de las sesiones con Gi en dos ocasiones distintas. Ella es muy cálida, sabe respetar los tiempos y las emociones. Fuiste sensible, atenta y profundamente bondadosa conmigo."',
    foto: testimonialFlor,
    nombre: 'Flor Ponce Mua',
    rol: 'Make Up & Hair Style · @florponcemua',
  },
  {
    texto:
      '"Me ayudó mucho a trabajar con mi imagen, me ayudó a conocerme, a conectar conmigo. Te acompaña de una manera cálida y empática en todo el proceso. Para mí fue un antes y un después."',
    foto: testimonialCaro,
    nombre: 'Carolina Ortiz',
    rol: 'Marketer y Cantautora · @caroortiz_musica',
  },
]

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-orquidea text-sm block mb-3">Testimonios</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">
            Voces que transformaron su camino
          </h2>
          <p className="text-ink/70">Experiencias reales de mujeres que eligieron priorizarse.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonios.map((t) => (
            <div key={t.nombre} className="bg-linen p-8 border-t-[3px] border-gold">
              <p className="text-sm italic text-ink/75 mb-6">{t.texto}</p>
              <div className="flex items-center gap-3.5">
                <img
                  src={t.foto}
                  alt={t.nombre}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <strong className="block text-sm">{t.nombre}</strong>
                  <span className="text-xs text-ink/60">{t.rol}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
