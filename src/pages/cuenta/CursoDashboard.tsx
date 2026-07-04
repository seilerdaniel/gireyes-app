import { useParams } from 'react-router-dom'

export default function CursoDashboard() {
  const { cursoSlug } = useParams()
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-6">Dashboard del curso: {cursoSlug}</h1>
      {/* TODO:
          1. Verificar que el usuario tenga un enrollment activo para este curso (si no, redirigir a /cursos/:slug)
          2. Listar módulos ordenados por `orden`
          3. Un módulo N está desbloqueado si:
             - N === 1, o
             - module_progress del módulo N-1 está completado, y
             - si el módulo N-1 tenía examen, existe un quiz_attempt aprobado para ese quiz
          4. Mostrar barra de progreso general y link a certificado si todos los módulos están completos
      */}
    </section>
  )
}
