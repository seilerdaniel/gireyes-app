import { useParams } from 'react-router-dom'

export default function ModuloContenido() {
  const { cursoSlug, moduloId } = useParams()
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-display text-2xl mb-6">
        {cursoSlug} — Módulo {moduloId}
      </h1>
      {/* TODO:
          1. Verificar acceso (enrollment + módulo desbloqueado), si no, redirigir
          2. Reproducir video (Bunny.net Stream con URL firmada, o embed de Vimeo)
          3. Al terminar el video (o botón "Marcar como visto"): actualizar module_progress
          4. Si requiere_examen: mostrar quiz antes de desbloquear el módulo siguiente
      */}
    </section>
  )
}
