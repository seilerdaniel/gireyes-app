import aboutImage from '../../assets/images/about-image.jpg'

export default function SobreMiSection() {
  return (
    <section id="sobre-mi" className="bg-malva py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
          <img
            src={aboutImage}
            alt="Giselle Reyes"
            className="aspect-[3/4] w-full object-cover rounded-2xl"
          />
          <div>
            <span className="font-display italic text-orquidea text-sm block mb-3">
              Sobre mí
            </span>
            <h2 className="font-display text-3xl mb-5">Giselle Reyes</h2>
            <p className="mb-4">
              Soy Coach Profesional certificada (ICF) y Asesora de Imagen. Acompaño a
              mujeres profesionales y emprendedoras que sostienen demasiado y necesitan
              recuperar claridad para decidir desde la autenticidad, no desde la culpa.
            </p>
            <p className="mb-4">
              Mi enfoque integra coaching, inteligencia emocional y comunicación
              consciente — porque la transformación real no es solo mental, también se
              refleja en cómo te ves y te presentás al mundo.
            </p>
            <p className="font-display italic text-lg text-plum mb-6">
              No se trata de hacer más. Se trata de estar mejor.
            </p>
            <div className="flex gap-3 flex-wrap mb-5">
              {['Empática', 'Estratégica', 'Comprometida'].map((b) => (
                <span
                  key={b}
                  className="font-display italic text-sm border border-orquidea rounded-full px-4 py-2"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="text-sm text-ink/60">
              📍 Radicada en Buenos Aires (Moreno) · Sesiones online
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
