import { Link, Outlet } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Layout() {
  const itemCount = useCartStore((s) => s.items.length)

  return (
    <div className="min-h-screen flex flex-col bg-linen text-ink">
      <header className="sticky top-0 z-50 bg-linen/90 backdrop-blur border-b border-ink/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl">
            GR <span className="italic text-terracotta">Método Esencia</span>
          </Link>
          <ul className="hidden md:flex gap-7 text-sm">
            <li><Link to="/#sobre-mi">Sobre mí</Link></li>
            <li><Link to="/#metodo">Método</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/cursos">Cursos</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/#contacto">Contacto</Link></li>
          </ul>
          <Link to="/carrito" className="text-sm font-semibold">
            Carrito ({itemCount})
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-ink text-linen/70 py-10 text-center text-sm">
        © 2026 Giselle Reyes · Coach Profesional (ICF) & Asesora de Imagen
      </footer>
    </div>
  )
}
