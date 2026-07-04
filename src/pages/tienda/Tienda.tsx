import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useCartStore } from '../../store/cartStore'
import type { Service } from '../../types'

export default function Tienda() {
  const [services, setServices] = useState<Service[]>([])
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*')
      if (data) setServices(data as Service[])
    }
    fetchServices()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="font-display text-4xl mb-10">Tienda</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border border-ink/10 p-6">
            <Link to={`/tienda/${service.slug}`}>
              <h3 className="font-display text-xl mb-2">{service.nombre}</h3>
            </Link>
            <p className="text-sm text-ink/70 mb-4">{service.descripcion}</p>
            <p className="font-display text-plum mb-4">
              ${service.precio_ars} ARS / ${service.precio_usd} USD
            </p>
            <button
              onClick={() => addItem(service)}
              className="bg-terracotta text-linen px-5 py-2 text-sm font-semibold"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
