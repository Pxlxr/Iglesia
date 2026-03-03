import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const newsItems = [
  {
    date: "Lunes, 02 de Marzo",
    title: "Reunion del Consejo Parroquial",
    description:
      "Se convoca a todos los miembros del consejo parroquial para la reunion mensual donde se trataran temas importantes sobre las actividades de Semana Santa y proyectos comunitarios.",
    tag: "Reunion",
  },
  {
    date: "Martes, 10 de Marzo",
    title: "Catequesis para Primera Comunion",
    description:
      "Inicio del nuevo ciclo de catequesis para ninos que se preparan para recibir su primera comunion. Los padres deben asistir a la primera sesion informativa.",
    tag: "Formacion",
  },
  {
    date: "Viernes, 13 de Marzo",
    title: "Via Crucis Comunitario",
    description:
      "Celebracion del Via Crucis por las calles principales de la comunidad. Se invita a todas las familias a participar en esta tradicion cuaresmal. Punto de encuentro: atrio de la parroquia.",
    tag: "Liturgia",
  },
  {
    date: "Jueves, 19 de Marzo",
    title: "Festividad de San Jose",
    description:
      "Misa solemne en honor a San Jose, patrono de los trabajadores y padre adoptivo de Jesus. La celebracion contara con la participacion del coro parroquial.",
    tag: "Celebracion",
  },
]

const tagColors: Record<string, string> = {
  Reunion: "bg-navy-light/15 text-navy-light",
  Formacion: "bg-gold/15 text-gold",
  Liturgia: "bg-primary/10 text-primary",
  Celebracion: "bg-accent/15 text-accent",
}

export function NewsSection() {
  return (
    <section id="noticias">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            Noticias y Avisos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mantente informado de las actividades parroquiales
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:flex"
        >
          Ver todas <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="grid gap-4">
        {newsItems.map((item, index) => (
          <Card
            key={index}
            className="group cursor-pointer border-border/60 bg-card py-0 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <CardContent className="flex gap-4 p-4 sm:p-5">
              {/* Date badge */}
              <div className="hidden shrink-0 flex-col items-center justify-center rounded-xl bg-primary px-3 py-2 text-center text-primary-foreground sm:flex">
                <CalendarDays className="mb-1 size-4 opacity-70" />
                <span className="text-xs font-medium leading-tight">
                  {item.date.split(",")[0]}
                </span>
                <span className="text-lg font-bold leading-tight">
                  {item.date.match(/\d+/)?.[0]}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      tagColors[item.tag] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-muted-foreground sm:hidden">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>

              <ArrowRight className="mt-2 hidden size-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary sm:block" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
