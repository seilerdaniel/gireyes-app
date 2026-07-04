import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '../components/home/Hero'
import ParaQuien from '../components/home/ParaQuien'
import SobreMiSection from '../components/home/SobreMiSection'
import MetodoEsencia from '../components/home/MetodoEsencia'
import Servicios from '../components/home/Servicios'
import Precios from '../components/home/Precios'
import Testimonios from '../components/home/Testimonios'
import Galeria from '../components/home/Galeria'
import ServiciosB2B from '../components/home/ServiciosB2B'
import Recursos from '../components/home/Recursos'
import FAQ from '../components/home/FAQ'
import CTAFinalContacto from '../components/home/CTAFinalContacto'

export default function Home() {
  const location = useLocation()

  // Si llegamos desde otra página con un hash (ej: /#metodo), hacemos scroll a esa sección
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <Hero />
      <ParaQuien />
      <SobreMiSection />
      <MetodoEsencia />
      <Servicios />
      <Precios />
      <Testimonios />
      <Galeria />
      <ServiciosB2B />
      <Recursos />
      <FAQ />
      <CTAFinalContacto />
    </>
  )
}
