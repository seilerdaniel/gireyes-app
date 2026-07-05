const steps = [
  { num: '01', title: 'Frenar', text: 'Reconocer que necesitás un espacio propio. El primer paso no es hacer más, es permitirte parar.' },
  { num: '02', title: 'Escuchar', text: 'Trabajar la claridad emocional. Identificamos qué te frena, qué cargás de más y qué necesitás soltar.' },
  { num: '03', title: 'Alinear', text: 'Conectar tu imagen externa con quién sos hoy. Que tu exterior refleje tu momento interno.' },
  { num: '04', title: 'Sostener', text: 'Herramientas concretas para mantener el cambio en el día a día, sin volver al piloto automático.' },
]

export default function MetodoEsencia() {
  return (
    <section id="metodo" className="bg-ink text-linen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="font-display italic text-gold text-sm block mb-3">El proceso</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Método Esencia</h2>
          <p className="text-linen/75">
            Un proceso de 4 pasos para reconectar con quién sos, por dentro y por fuera.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-9 relative">
          <div
            className="hidden md:block absolute top-[34px] left-[8%] right-[8%] h-px"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #A98B4F 0 8px, transparent 8px 14px)',
            }}
          />
          {steps.map((s) => (
            <div key={s.num} className="relative z-10">
              <div className="w-[68px] h-[68px] rounded-full bg-linen border border-gold flex items-center justify-center font-display text-terracotta mb-5">
                {s.num}
              </div>
              <h3 className="font-display text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-linen/80">{s.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-16 font-display italic text-2xl text-gold">
          "No se trata de hacer más. Se trata de estar mejor."
        </p>
      </div>
    </section>
  )
}
