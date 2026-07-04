export interface Service {
  id: string
  slug: string
  nombre: string
  descripcion: string
  precio_ars: number
  precio_usd: number
  tipo: 'sesion' | 'pack' | 'programa' | 'curso'
  imagen_url?: string
}

export interface CartItem {
  service: Service
  cantidad: number
}

export interface Course {
  id: string
  slug: string
  titulo: string
  descripcion: string
  service_id: string
}

export interface Module {
  id: string
  course_id: string
  orden: number
  titulo: string
  video_url: string
  requiere_examen: boolean
}

export interface Quiz {
  id: string
  module_id: string
  preguntas: QuizQuestion[]
  nota_minima: number
}

export interface QuizQuestion {
  pregunta: string
  opciones: string[]
  respuesta_correcta: number
}

export interface ModuleProgress {
  user_id: string
  module_id: string
  completado: boolean
  fecha?: string
}

export interface BlogPost {
  id: string
  slug: string
  titulo: string
  resumen: string
  contenido: string
  fecha: string
  imagen_url?: string
}
