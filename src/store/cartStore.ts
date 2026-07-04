import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Service } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (service: Service) => void
  removeItem: (serviceId: string) => void
  updateQuantity: (serviceId: string, cantidad: number) => void
  clearCart: () => void
  total: (moneda: 'ars' | 'usd') => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (service) => {
        const items = get().items
        const existing = items.find((i) => i.service.id === service.id)
        if (existing) {
          set({
            items: items.map((i) =>
              i.service.id === service.id
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { service, cantidad: 1 }] })
        }
      },

      removeItem: (serviceId) => {
        set({ items: get().items.filter((i) => i.service.id !== serviceId) })
      },

      updateQuantity: (serviceId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(serviceId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.service.id === serviceId ? { ...i, cantidad } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      total: (moneda) => {
        return get().items.reduce((sum, item) => {
          const precio = moneda === 'ars' ? item.service.precio_ars : item.service.precio_usd
          return sum + precio * item.cantidad
        }, 0)
      },
    }),
    { name: 'gireyes-cart' }
  )
)
