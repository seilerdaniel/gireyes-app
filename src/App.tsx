import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CheckoutExito from './pages/CheckoutExito'

import Blog from './pages/blog/Blog'
import BlogPost from './pages/blog/BlogPost'

import Tienda from './pages/tienda/Tienda'
import ServicioDetalle from './pages/tienda/ServicioDetalle'

import Cursos from './pages/cursos/Cursos'
import CursoDetalle from './pages/cursos/CursoDetalle'

import MiCuenta from './pages/cuenta/MiCuenta'
import CursoDashboard from './pages/cuenta/CursoDashboard'
import ModuloContenido from './pages/cuenta/ModuloContenido'
import Certificado from './pages/cuenta/Certificado'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />

        <Route path="tienda" element={<Tienda />} />
        <Route path="tienda/:servicioSlug" element={<ServicioDetalle />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/exito" element={<CheckoutExito />} />

        <Route path="cursos" element={<Cursos />} />
        <Route path="cursos/:cursoSlug" element={<CursoDetalle />} />

        <Route path="mi-cuenta" element={<MiCuenta />} />
        <Route path="mi-cuenta/curso/:cursoSlug" element={<CursoDashboard />} />
        <Route path="mi-cuenta/curso/:cursoSlug/modulo/:moduloId" element={<ModuloContenido />} />
        <Route path="mi-cuenta/curso/:cursoSlug/certificado" element={<Certificado />} />
      </Route>
    </Routes>
  )
}

export default App
