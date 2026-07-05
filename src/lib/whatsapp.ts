const WHATSAPP_NUMBER = '5491161948284'

/**
 * Genera un link de WhatsApp con un mensaje predeterminado según el contexto
 * desde donde se hace click.
 */
export function whatsappLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export const whatsappMensajes = {
  footer: 'Hola Giselle! Vi tu web y quiero más información.',
  consultaGratuita: 'Hola Giselle! Quiero agendar mi consulta gratuita.',
  b2b: 'Hola Giselle! Represento a una empresa/equipo y quiero consultar por una propuesta a medida.',
}
