import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { to: '/#sobre-mi', label: 'Sobre mí' },
  { to: '/#metodo', label: 'Método' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/blog', label: 'Blog' },
  { to: '/#contacto', label: 'Contacto' },
]

export default function Layout() {
  const itemCount = useCartStore((s) => s.items.length)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-linen text-ink">
      <header className="sticky top-0 z-50 bg-linen/90 backdrop-blur border-b border-ink/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl" onClick={() => setMenuOpen(false)}>
            GR <span className="italic text-terracotta">Método Esencia</span>
          </Link>

          <ul className="hidden md:flex gap-7 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link to="/carrito" className="text-sm font-semibold" onClick={() => setMenuOpen(false)}>
              Carrito ({itemCount})
            </Link>

            <button
              type="button"
              className="md:hidden text-2xl leading-none w-8 h-8 flex items-center justify-center"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay + drawer mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-linen border-l border-ink/10 shadow-2xl transform transition-transform duration-300 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-4 border border-ink px-5 py-2.5 text-center text-sm font-semibold"
          >
            Ingresar
          </Link>
        </div>
      </div>

      {/* Cierra el menú automáticamente al cambiar de ruta */}
      <MenuCloseOnNavigate pathname={location.pathname} setMenuOpen={setMenuOpen} />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-ink text-linen/70 py-10 text-center text-sm">
        © 2026 Giselle Reyes · Coach Profesional (ICF) & Asesora de Imagen
      </footer>
    </div>
  )
}

// Pequeño helper: cierra el drawer si el usuario navega por otra vía (ej. botón "atrás")
function MenuCloseOnNavigate({
  pathname,
  setMenuOpen,
}: {
  pathname: string
  setMenuOpen: (v: boolean) => void
}) {
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, setMenuOpen])
  return null
}
