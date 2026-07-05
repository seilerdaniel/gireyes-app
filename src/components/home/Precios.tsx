import { whatsappLink, whatsappMensajes } from '../../lib/whatsapp'

const planes = [
  {
    nombre: 'Sesión suelta',
    precio: '$25.000 – $35.000',
    items: ['1 sesión de Coaching o Asesoría de Imagen', 'Modalidad online'],
    destacado: false,
    whatsappMsg: whatsappMensajes.planSesionSuelta,
  },
  {
    nombre: 'Programa Integral',
    precio: '$180.000 – $250.000',
    items: ['8 a 12 semanas', 'Coaching + Asesoría de Imagen', 'Seguimiento personalizado'],
    destacado: true,
    star: '★ Método Esencia',
    whatsappMsg: whatsappMensajes.planMetodoEsencia,
  },
  {
    nombre: 'Pack mensual',
    precio: '$90.000 – $110.000',
    items: ['4 sesiones (Coaching o Imagen)', 'Modalidad online'],
    destacado: false,
    whatsappMsg: whatsappMensajes.planPackMensual,
  },
]

export default function Precios() {
  return (
    <section id="precios" className="bg-malva py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-14">
          <span className="font-display italic text-orquidea text-sm block mb-3">Inversión</span>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Invertí en vos</h2>
          <p className="text-ink/70">
            Precios de referencia — consultanos por planes y formas de pago.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {planes.map((p) => (
            <div
              key={p.nombre}
              className={`p-9 flex flex-col bg-linen ${
                p.destacado
                  ? 'border-2 border-orquidea md:scale-105 shadow-xl order-first md:order-none'
                  : 'border border-ink/15'
              }`}
            >
              {p.star && (
                <span className="text-orquidea text-xs uppercase tracking-wide font-semibold mb-2">
                  {p.star}
                </span>
              )}
              <h3 className="font-display text-lg mb-2">{p.nombre}</h3>
              <p className="font-display text-2xl text-plum my-3">{p.precio}</p>
              <ul className="text-sm text-ink/70 mb-6 flex-grow space-y-1.5">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <a
                href={whatsappLink(p.whatsappMsg)}
                target="_blank"
                rel="noreferrer"
                className={
                  p.destacado
                    ? 'bg-orquidea text-linen text-center px-6 py-3 rounded-xl font-semibold'
                    : 'border border-ink text-center px-6 py-3 rounded-xl font-semibold'
                }
              >
                Agendar consulta
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-ink/60 italic">
          Los valores son orientativos y pueden variar según tu proceso. Escribime y
          armamos juntas el plan ideal para vos.
        </p>
      </div>
    </section>
  )
}
