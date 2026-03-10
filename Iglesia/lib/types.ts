// Content types for the CMS

export interface NewsItem {
  id: string
  date: string
  title: string
  description: string
  tag: string
  createdAt: number
}

export interface CalendarEvent {
  id: string
  date: string // ISO date string YYYY-MM-DD
  highlighted: boolean
}

export interface Event {
  id: string
  date: string // ISO date string YYYY-MM-DD
  time: string // HH:mm format
  title: string
  location: string
  createdAt: number
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  description: string
  createdAt: number
}

export interface ContentStore {
  news: NewsItem[]
  calendarDates: CalendarEvent[]
  events: Event[]
  gallery: GalleryImage[]
}

export const defaultContent: ContentStore = {
  news: [
    {
      id: "1",
      date: "Lunes, 02 de Marzo",
      title: "Reunion del Consejo Parroquial",
      description:
        "Se convoca a todos los miembros del consejo parroquial para la reunion mensual donde se trataran temas importantes sobre las actividades de Semana Santa y proyectos comunitarios.",
      tag: "Reunion",
      createdAt: Date.now(),
    },
    {
      id: "2",
      date: "Martes, 10 de Marzo",
      title: "Catequesis para Primera Comunion",
      description:
        "Inicio del nuevo ciclo de catequesis para ninos que se preparan para recibir su primera comunion. Los padres deben asistir a la primera sesion informativa.",
      tag: "Formacion",
      createdAt: Date.now(),
    },
    {
      id: "3",
      date: "Viernes, 13 de Marzo",
      title: "Via Crucis Comunitario",
      description:
        "Celebracion del Via Crucis por las calles principales de la comunidad. Se invita a todas las familias a participar en esta tradicion cuaresmal. Punto de encuentro: atrio de la parroquia.",
      tag: "Liturgia",
      createdAt: Date.now(),
    },
    {
      id: "4",
      date: "Jueves, 19 de Marzo",
      title: "Festividad de San Jose",
      description:
        "Misa solemne en honor a San Jose, patrono de los trabajadores y padre adoptivo de Jesus. La celebracion contara con la participacion del coro parroquial.",
      tag: "Celebracion",
      createdAt: Date.now(),
    },
  ],
  calendarDates: [
    { id: "c1", date: "2026-03-02", highlighted: true },
    { id: "c2", date: "2026-03-10", highlighted: true },
    { id: "c3", date: "2026-03-13", highlighted: true },
    { id: "c4", date: "2026-03-19", highlighted: true },
    { id: "c5", date: "2026-03-22", highlighted: true },
    { id: "c6", date: "2026-03-29", highlighted: true },
  ],
  events: [
    {
      id: "e1",
      date: "2026-03-02",
      time: "18:00",
      title: "Consejo Parroquial",
      location: "Salon Parroquial",
      createdAt: Date.now(),
    },
    {
      id: "e2",
      date: "2026-03-10",
      time: "16:00",
      title: "Catequesis",
      location: "Aula 1",
      createdAt: Date.now(),
    },
    {
      id: "e3",
      date: "2026-03-13",
      time: "17:30",
      title: "Via Crucis",
      location: "Atrio principal",
      createdAt: Date.now(),
    },
    {
      id: "e4",
      date: "2026-03-19",
      time: "10:00",
      title: "Misa de San Jose",
      location: "Templo principal",
      createdAt: Date.now(),
    },
  ],
  gallery: [],
}
