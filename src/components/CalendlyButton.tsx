import { useState, lazy, Suspense, type ReactNode } from 'react'

// react-calendly solo se descarga cuando el usuario efectivamente hace
// click en "Agendar" — no forma parte del bundle inicial del Home.
const PopupModal = lazy(() =>
  import('react-calendly').then((mod) => ({ default: mod.PopupModal }))
)

const CALENDLY_URL = 'https://calendly.com/gireyesimagen'

interface CalendlyButtonProps {
  className?: string
  children: ReactNode
}

/**
 * Botón que abre el calendario de reserva de Giselle (Calendly) en un modal,
 * sin salir del sitio. Se usa en todos los CTAs de "Agendar consulta".
 *
 * Nota: la cuenta de Calendly está en el plan Free, que solo permite un
 * evento activo a la vez — por eso todos los botones apuntan al mismo link,
 * sin importar de qué sección/plan vienen. Para diferenciar el motivo de la
 * consulta, conviene agregar una pregunta personalizada en la configuración
 * del evento de Calendly (ej. "¿Qué te interesa: Coaching, Asesoría de
 * Imagen, o el Programa Integral?").
 */
export default function CalendlyButton({ className, children }: CalendlyButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <Suspense fallback={null}>
          <PopupModal
            url={CALENDLY_URL}
            onModalClose={() => setOpen(false)}
            open={open}
            rootElement={document.getElementById('root') as HTMLElement}
          />
        </Suspense>
      )}
    </>
  )
}
