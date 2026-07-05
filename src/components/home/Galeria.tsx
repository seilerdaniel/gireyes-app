import gallery1 from '../../assets/images/gallery-1.jpg'
import gallery2 from '../../assets/images/gallery-2.jpg'
import gallery3 from '../../assets/images/gallery-3.jpg'
import gallery4 from '../../assets/images/gallery-4.jpg'

const fotos = [
  { src: gallery1, caption: 'Look casual-chic para el día a día' },
  { src: gallery2, caption: 'Seguridad en cada detalle' },
  { src: gallery3, caption: 'Momentos de introspección — trabajo interior' },
  { src: gallery4, caption: 'Reconectando con la autenticidad' },
]

export default function Galeria() {
  return (
    <section className="bg-malva py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-orquidea text-sm block mb-3">Galería</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Momentos de transformación</h2>
          <p className="text-ink/70">
            Cada proceso es único. Mereces brillar con la luz que siempre fue tuya.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {fotos.map((foto) => (
            <div key={foto.caption} className="aspect-[4/5] relative overflow-hidden rounded-2xl group">
              <img
                src={foto.src}
                alt={foto.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent flex items-end p-5">
                <span className="font-display italic text-linen text-base">{foto.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
