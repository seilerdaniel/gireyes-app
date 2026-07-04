import { useParams } from 'react-router-dom'

export default function Certificado() {
  const { cursoSlug } = useParams()
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl mb-6">Certificado — {cursoSlug}</h1>
      {/* TODO: verificar que todos los módulos estén completos, mostrar/generar el PDF
          desde Supabase Storage (certificates.url_pdf) y ofrecer botón de descarga */}
    </section>
  )
}
