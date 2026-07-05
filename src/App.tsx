import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Home se importa de forma normal (no lazy): es la primera pantalla que ve
// casi todo el mundo, así que no tiene sentido mostrar un loader para ella.
import Home from './pages/Home'

// El resto de las páginas se cargan bajo demanda (code-splitting por ruta).
// Esto saca del bundle inicial todo lo que no hace falta hasta que el
// usuario navega a esa sección puntual.
const Login = lazy(() => import('./pages/Login'))
const Registro = lazy(() => import('./pages/Registro'))
const Carrito = lazy(() => import('./pages/Carrito'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CheckoutExito = lazy(() => import('./pages/CheckoutExito'))

const Blog = lazy(() => import('./pages/blog/Blog'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))

const Tienda = lazy(() => import('./pages/tienda/Tienda'))
const ServicioDetalle = lazy(() => import('./pages/tienda/ServicioDetalle'))

const Cursos = lazy(() => import('./pages/cursos/Cursos'))
const CursoDetalle = lazy(() => import('./pages/cursos/CursoDetalle'))

const MiCuenta = lazy(() => import('./pages/cuenta/MiCuenta'))
const CursoDashboard = lazy(() => import('./pages/cuenta/CursoDashboard'))
const ModuloContenido = lazy(() => import('./pages/cuenta/ModuloContenido'))
const Certificado = lazy(() => import('./pages/cuenta/Certificado'))

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-orquidea border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="login"
          element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="registro"
          element={
            <Suspense fallback={<PageLoader />}>
              <Registro />
            </Suspense>
          }
        />

        <Route
          path="blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPost />
            </Suspense>
          }
        />

        <Route
          path="tienda"
          element={
            <Suspense fallback={<PageLoader />}>
              <Tienda />
            </Suspense>
          }
        />
        <Route
          path="tienda/:servicioSlug"
          element={
            <Suspense fallback={<PageLoader />}>
              <ServicioDetalle />
            </Suspense>
          }
        />
        <Route
          path="carrito"
          element={
            <Suspense fallback={<PageLoader />}>
              <Carrito />
            </Suspense>
          }
        />
        <Route
          path="checkout"
          element={
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="checkout/exito"
          element={
            <Suspense fallback={<PageLoader />}>
              <CheckoutExito />
            </Suspense>
          }
        />

        <Route
          path="cursos"
          element={
            <Suspense fallback={<PageLoader />}>
              <Cursos />
            </Suspense>
          }
        />
        <Route
          path="cursos/:cursoSlug"
          element={
            <Suspense fallback={<PageLoader />}>
              <CursoDetalle />
            </Suspense>
          }
        />

        <Route
          path="mi-cuenta"
          element={
            <Suspense fallback={<PageLoader />}>
              <MiCuenta />
            </Suspense>
          }
        />
        <Route
          path="mi-cuenta/curso/:cursoSlug"
          element={
            <Suspense fallback={<PageLoader />}>
              <CursoDashboard />
            </Suspense>
          }
        />
        <Route
          path="mi-cuenta/curso/:cursoSlug/modulo/:moduloId"
          element={
            <Suspense fallback={<PageLoader />}>
              <ModuloContenido />
            </Suspense>
          }
        />
        <Route
          path="mi-cuenta/curso/:cursoSlug/certificado"
          element={
            <Suspense fallback={<PageLoader />}>
              <Certificado />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
