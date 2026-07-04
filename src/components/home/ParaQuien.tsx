const items = [
  'Sos la que resuelve todo, pero nadie pregunta cómo estás vos.',
  'Tomás decisiones desde la culpa o el deber, no desde lo que realmente querés.',
  'Sentís que en algún momento del camino dejaste de reconocerte.',
  'Estás cansada de posponerte "para cuando haya tiempo".',
  'Sabés que merecés más claridad, pero no sabés por dónde empezar.',
]

export default function ParaQuien() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-terracotta text-sm block mb-3">
            Para quién es esto
          </span>
          <h2 className="font-display text-3xl md:text-4xl">¿Te identificás con esto?</h2>
        </div>
        <div className="max-w-3xl">
          {items.map((text, i) => (
            <div
              key={i}
              className="flex gap-4 items-baseline py-6 border-b border-ink/10 font-display text-xl"
            >
              <span className="text-terracotta italic text-base w-6 flex-shrink-0">—</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
