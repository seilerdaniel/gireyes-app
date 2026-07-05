const WHATSAPP_NUMBER = '5491161948284'

/**
 * Genera un link de WhatsApp con un mensaje predeterminado según el contexto
 * desde donde se hace click. Mantener todos los mensajes acá centralizados
 * facilita editarlos a futuro sin buscar en cada componente.
 */
export function whatsappLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export const whatsappMensajes = {
  general: 'Hola Giselle! Vi tu web y quiero más información.',
  footer: 'Hola Giselle! Vi tu web y quiero más información.',
  heroConsulta: 'Hola Giselle! Vi tu web y quiero agendar mi consulta gratuita.',
  consultaGratuita: 'Hola Giselle! Quiero agendar mi consulta gratuita.',
  b2b: 'Hola Giselle! Represento a una empresa/equipo y quiero consultar por una propuesta a medida.',
  planSesionSuelta: 'Hola Giselle! Me interesa una sesión suelta de Coaching o Asesoría de Imagen. ¿Podemos coordinar?',
  planPackMensual: 'Hola Giselle! Me interesa el Pack Mensual (4 sesiones). ¿Podemos coordinar?',
  planMetodoEsencia: 'Hola Giselle! Me interesa el Programa Integral Método Esencia. ¿Podemos coordinar?',
}
