import { useParams } from 'react-router-dom'

export default function CursoDetalle() {
  const { cursoSlug } = useParams()
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-4">Curso: {cursoSlug}</h1>
      {/* TODO: mostrar landing del curso + botón "Comprar" que agrega el curso al carrito
          como un Service de tipo 'curso' */}
    </section>
  )
}
