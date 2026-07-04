import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCartStore } from '../../store/cartStore'
import type { Service } from '../../types'

export default function ServicioDetalle() {
  const { servicioSlug } = useParams()
  const [service, setService] = useState<Service | null>(null)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    async function fetchService() {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('slug', servicioSlug)
        .single()
      setService(data as Service)
    }
    fetchService()
  }, [servicioSlug])

  if (!service) return <p className="max-w-3xl mx-auto px-6 py-24">Cargando...</p>

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-4xl mb-4">{service.nombre}</h1>
      <p className="text-ink/70 mb-6">{service.descripcion}</p>
      <p className="font-display text-2xl text-plum mb-8">
        ${service.precio_ars} ARS / ${service.precio_usd} USD
      </p>
      <button
        onClick={() => addItem(service)}
        className="bg-terracotta text-linen px-6 py-3 font-semibold"
      >
        Agregar al carrito
      </button>
    </section>
  )
}
