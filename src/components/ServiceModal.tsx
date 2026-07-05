import { useEffect } from 'react'
import { X, CreditCard, Landmark } from 'lucide-react'
import type { Service } from '../types'

const tipoLabels: Record<Service['tipo'], string> = {
  sesion: 'Sesión individual',
  pack: 'Pack de sesiones',
  programa: 'Programa integral',
  curso: 'Curso online',
}

interface ServiceModalProps {
  service: Service | null
  onClose: () => void
  onAddToCart: (service: Service) => void
  onBuyNow: (service: Service) => void
}

export default function ServiceModal({
  service,
  onClose,
  onAddToCart,
  onBuyNow,
}: ServiceModalProps) {
  // Cierra con la tecla Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (service) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [service, onClose])

  if (!service) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenido del modal */}
      <div className="relative bg-linen rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
        >
          <X size={20} />
        </button>

        <span className="inline-block bg-malva text-ink text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
          {tipoLabels[service.tipo]}
        </span>

        <h2 id="service-modal-title" className="font-display text-2xl mb-3 pr-8">
          {service.nombre}
        </h2>

        <p className="text-ink/70 text-sm mb-6">{service.descripcion}</p>

        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-display text-2xl text-plum">${service.precio_ars} ARS</span>
          <span className="text-ink/40 text-sm">/ ${service.precio_usd} USD</span>
        </div>

        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2.5">
            Métodos de pago aceptados
          </p>
          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 border border-ink/15 rounded-lg px-3 py-2 text-sm">
              <Landmark size={16} /> Mercado Pago (ARS)
            </span>
            <span className="flex items-center gap-1.5 border border-ink/15 rounded-lg px-3 py-2 text-sm">
              <CreditCard size={16} /> Stripe (USD)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onBuyNow(service)}
            className="flex-1 bg-orquidea text-linen py-3 rounded-xl font-semibold"
          >
            Comprar ahora
          </button>
          <button
            onClick={() => onAddToCart(service)}
            className="flex-1 border border-ink py-3 rounded-xl font-semibold hover:bg-ink hover:text-linen transition-colors"
          >
            Agregar al carrito
          </button>
        </div>

        <p className="text-xs text-ink/50 text-center mt-5">
          ¿Tenés dudas sobre si este servicio es para vos?{' '}
          <a href="/#contacto" className="text-orquidea font-semibold">
            Escribinos
          </a>
          .
        </p>
      </div>
    </div>
  )
}
