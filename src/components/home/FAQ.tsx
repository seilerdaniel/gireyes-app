import { useState, useRef } from 'react'

const faqs = [
  {
    q: '¿Qué es el Coaching?',
    a: 'Un proceso de acompañamiento donde vos tenés las respuestas — mi rol es ayudarte a encontrarlas con preguntas, herramientas y un espacio sin juicio. No es terapia ni consejería: es un espacio de acción y claridad.',
  },
  {
    q: '¿Qué incluye una sesión de Coaching conmigo?',
    a: 'Sesiones online 100% enfocadas en vos. Trabajamos sobre lo que te está pasando hoy, con herramientas concretas para que salgas con claridad, no solo con reflexión.',
  },
  {
    q: '¿Qué es una Asesoría de Imagen con enfoque emocional?',
    a: 'No se trata solo de "qué ropa te queda bien". Trabajamos primero qué querés transmitir y cómo te sentís, y desde ahí alineamos tu imagen externa con tu momento interno.',
  },
  {
    q: '¿Puedo combinar sesiones de Coaching con Asesoría de Imagen?',
    a: 'Sí, de hecho es lo que más recomiendo — es el Método Esencia, mi programa integral que trabaja ambos procesos en conjunto.',
  },
  {
    q: '¿Trabajás con mujeres de cualquier edad o con un perfil específico?',
    a: 'Trabajo principalmente con mujeres profesionales y emprendedoras que sienten que sostienen demasiado y necesitan volver a priorizarse. No hay un rango de edad excluyente, sino una forma de sentir que es compartida.',
  },
  {
    q: '¿Las sesiones son online o presenciales?',
    a: 'Todas mis sesiones son online, para que puedas trabajar en tu proceso desde donde estés.',
  },
  {
    q: '¿Cuánto dura el proceso completo?',
    a: 'Depende del servicio: una sesión suelta es puntual, mientras que el Método Esencia (programa integral) dura entre 8 y 12 semanas.',
  },
  {
    q: '¿Qué pasa si no estoy segura de qué necesito, coaching o asesoría de imagen?',
    a: 'No hace falta que lo sepas de antemano. Agendá una consulta gratuita y juntas definimos qué camino se ajusta mejor a tu momento.',
  },
  {
    q: '¿Hay política de cancelación o reprogramación de sesiones?',
    a: 'Sí, podés reprogramar tu sesión con al menos 24 horas de anticipación sin costo adicional. Escribime por WhatsApp para coordinarlo.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-ink/15">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full text-left py-5.5 flex justify-between items-center gap-4 font-display text-lg"
      >
        {q}
        <span
          className={`text-terracotta text-xl flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 500}px` : '0px' }}
      >
        <p className="pb-5.5 text-sm text-ink/70 max-w-xl">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="bg-sand py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <span className="font-display italic text-terracotta text-sm block mb-3">
            Preguntas frecuentes
          </span>
          <h2 className="font-display text-3xl md:text-4xl">
            Respuestas a las dudas más comunes
          </h2>
        </div>

        <div className="max-w-3xl">
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
