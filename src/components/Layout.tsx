import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { useCartStore } from '../store/cartStore'
import { whatsappLink, whatsappMensajes } from '../lib/whatsapp'
import logo from '../assets/images/logo.jpg'

const navLinks = [
  { to: '/#sobre-mi', label: 'Sobre mí' },
  { to: '/#metodo', label: 'Método' },
  { to: '/tienda', label: 'Tienda' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/blog', label: 'Blog' },
  { to: '/#contacto', label: 'Contacto' },
]

const SOCIAL = {
  instagram: 'https://www.instagram.com/gireyesimagen',
  tiktok: 'https://www.tiktok.com/@gireyesimagen',
}

export default function Layout() {
  const itemCount = useCartStore((s) => s.items.length)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-linen text-ink">
      <header className="sticky top-0 z-50 bg-linen/90 backdrop-blur border-b border-ink/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Gi Reyes — Imagen & Coach" className="h-10 w-auto rounded-lg" />
            <span className="hidden sm:inline font-display italic text-orquidea text-sm">
              Método Esencia
            </span>
          </Link>

          <ul className="hidden md:flex gap-7 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link
              to="/carrito"
              className="relative flex items-center gap-1.5 text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
              aria-label={`Carrito, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-orquidea text-linen text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden text-2xl leading-none w-8 h-8 flex items-center justify-center"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
            className="mt-4 border border-ink rounded-xl px-5 py-2.5 text-center text-sm font-semibold"
          >
            Ingresar
          </Link>
        </div>
      </div>

      <MenuCloseOnNavigate pathname={location.pathname} setMenuOpen={setMenuOpen} />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-ink text-linen/70 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <h4 className="font-display text-linen text-lg mb-4">Giselle Reyes</h4>
              <p className="text-sm">
                Coach Profesional (ICF) y Asesora de Imagen. Acompañamiento empático para
                mujeres que buscan claridad emocional y bienestar auténtico.
              </p>
            </div>

            <div>
              <h4 className="font-display text-linen text-lg mb-4">Contacto</h4>
              <ul className="text-sm space-y-2">
                <li>📍 Buenos Aires, Argentina</li>
                <li>
                  <a href="mailto:gireyesimagen@gmail.com">gireyesimagen@gmail.com</a>
                </li>
                <li>
                  <a href={whatsappLink(whatsappMensajes.footer)} target="_blank" rel="noreferrer">
                    WhatsApp: +54 9 11 6194 8284
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-linen text-lg mb-4">Redes Sociales</h4>
              <div className="flex gap-4">
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram de Gi Reyes"
                  className="w-10 h-10 rounded-full border border-linen/30 flex items-center justify-center hover:bg-linen hover:text-ink transition-colors"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href={SOCIAL.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok de Gi Reyes"
                  className="w-10 h-10 rounded-full border border-linen/30 flex items-center justify-center hover:bg-linen hover:text-ink transition-colors"
                >
                  <FaTiktok size={18} />
                </a>
                <a
                  href={whatsappLink(whatsappMensajes.footer)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Escribir por WhatsApp"
                  className="w-10 h-10 rounded-full border border-linen/30 flex items-center justify-center hover:bg-linen hover:text-ink transition-colors"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-linen/10 pt-6 text-center text-xs">
            © 2026 Giselle Reyes · Coach Profesional (ICF) & Asesora de Imagen — Todos los
            derechos reservados
          </div>
        </div>
      </footer>
    </div>
  )
}

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
