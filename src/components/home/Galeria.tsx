const fotos = [
  'Look casual-chic para el día a día',
  'Seguridad en cada detalle',
  'Momentos de introspección — trabajo interior',
  'Reconectando con la autenticidad',
]

export default function Galeria() {
  return (
    <section className="bg-sand py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-terracotta text-sm block mb-3">Galería</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Momentos de transformación</h2>
          <p className="text-ink/70">
            Cada proceso es único. Mereces brillar con la luz que siempre fue tuya.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {fotos.map((caption) => (
            <div
              key={caption}
              className="aspect-[4/5] bg-gradient-to-br from-sand to-terracotta flex items-end p-5"
            >
              <span className="font-display italic text-linen text-base">{caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
