import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Carrito() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Tu carrito está vacío</h1>
        <Link to="/tienda" className="text-orquidea font-semibold">
          Ver servicios →
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-10">Tu carrito</h1>
      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div key={item.service.id} className="flex justify-between items-center border-b border-ink/10 pb-4">
            <div>
              <h3 className="font-display text-lg">{item.service.nombre}</h3>
              <p className="text-sm text-ink/60">${item.service.precio_ars} ARS</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.cantidad}
                onChange={(e) => updateQuantity(item.service.id, Number(e.target.value))}
                className="w-14 border border-ink/20 rounded-lg text-center py-1"
              />
              <button onClick={() => removeItem(item.service.id)} className="text-orquidea text-sm">
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="font-display text-xl mb-6">Total: ${total('ars')} ARS</p>
      <Link to="/checkout" className="bg-orquidea text-linen px-6 py-3 rounded-xl font-semibold inline-block">
        Ir a pagar
      </Link>
    </section>
  )
}
