import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

/**
 * Esta ruta existe para que los links directos a un servicio específico
 * (ej. desde la Home o compartidos externamente) sigan funcionando, pero
 * en vez de duplicar la UI de detalle, redirige a la Tienda con un query
 * param que abre el mismo modal enriquecido (ver Tienda.tsx).
 */
export default function ServicioDetalle() {
  const { servicioSlug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/tienda?servicio=${servicioSlug}`, { replace: true })
  }, [servicioSlug, navigate])

  return null
}
