import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useCartStore } from '../../store/cartStore'
import ServiceModal from '../../components/ServiceModal'
import type { Service } from '../../types'

export default function Tienda() {
  const [services, setServices] = useState<Service[]>([])
  const [selected, setSelected] = useState<Service | null>(null)
  const addItem = useCartStore((s) => s.addItem)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*')
      if (data) setServices(data as Service[])
    }
    fetchServices()
  }, [])

  // Si llegamos con ?servicio=slug (desde la Home o un link compartido),
  // abrimos el modal de ese servicio automáticamente.
  useEffect(() => {
    const slug = searchParams.get('servicio')
    if (slug && services.length > 0) {
      const match = services.find((s) => s.slug === slug)
      if (match) setSelected(match)
    }
  }, [searchParams, services])

  function handleCloseModal() {
    setSelected(null)
    if (searchParams.get('servicio')) {
      searchParams.delete('servicio')
      setSearchParams(searchParams, { replace: true })
    }
  }

  function handleAddToCart(service: Service) {
    addItem(service)
    handleCloseModal()
  }

  function handleBuyNow(service: Service) {
    addItem(service)
    handleCloseModal()
    navigate('/checkout')
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="font-display text-4xl mb-3">Tienda</h1>
      <p className="text-ink/70 mb-10">
        Elegí el servicio que necesitás y sumalo a tu carrito, o mirá el detalle completo
        antes de decidir.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border border-ink/10 p-6 flex flex-col">
            <h3 className="font-display text-xl mb-2">{service.nombre}</h3>
            <p className="text-sm text-ink/70 mb-4 flex-grow">{service.descripcion}</p>
            <p className="font-display text-plum mb-4">
              ${service.precio_ars} ARS / ${service.precio_usd} USD
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setSelected(service)}
                className="flex-1 border border-ink px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-ink hover:text-linen transition-colors"
              >
                Ver detalle
              </button>
              <button
                onClick={() => addItem(service)}
                className="flex-1 bg-orquidea text-linen px-4 py-2.5 rounded-xl text-sm font-semibold"
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <p className="text-ink/50 text-center py-16">
          Todavía no hay servicios cargados. Volvé pronto.
        </p>
      )}

      <ServiceModal
        service={selected}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </section>
  )
}
