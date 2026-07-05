import { useState } from 'react'
import { useCartStore } from '../store/cartStore'

export default function Checkout() {
  const { items, total } = useCartStore()
  const [metodo, setMetodo] = useState<'mercadopago' | 'stripe'>('mercadopago')

  // TODO: al confirmar, crear la orden en Supabase (tabla `orders` + `order_items`)
  // y redirigir a la preferencia de pago de Mercado Pago o a la Checkout Session de Stripe
  // según `metodo`. Ambos flujos deben terminar en /checkout/exito vía webhook.

  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-10">Checkout</h1>

      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold">Método de pago</p>
        <div className="flex gap-4">
          <button
            onClick={() => setMetodo('mercadopago')}
            className={`px-5 py-2 rounded-xl border ${metodo === 'mercadopago' ? 'bg-ink text-linen' : 'border-ink/20'}`}
          >
            Mercado Pago (ARS)
          </button>
          <button
            onClick={() => setMetodo('stripe')}
            className={`px-5 py-2 rounded-xl border ${metodo === 'stripe' ? 'bg-ink text-linen' : 'border-ink/20'}`}
          >
            Stripe (USD)
          </button>
        </div>
      </div>

      <p className="font-display text-xl mb-8">
        Total: ${metodo === 'mercadopago' ? total('ars') + ' ARS' : total('usd') + ' USD'}
      </p>

      <button className="bg-orquidea text-linen px-6 py-3 rounded-xl font-semibold w-full">
        Confirmar y pagar ({items.length} {items.length === 1 ? 'item' : 'items'})
      </button>
    </section>
  )
}
