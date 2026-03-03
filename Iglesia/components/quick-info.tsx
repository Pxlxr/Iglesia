import { Clock, MapPin, Phone, BookOpen } from "lucide-react"

const infoItems = [
  {
    icon: Clock,
    label: "Horario de Misas",
    value: "Dom 8:00, 10:00, 12:00",
  },
  {
    icon: MapPin,
    label: "Ubicacion",
    value: "Av. Principal #123, Centro",
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+52 (777) 123-4567",
  },
  {
    icon: BookOpen,
    label: "Confesiones",
    value: "Sab 10:00 - 12:00",
  },
]

export function QuickInfo() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 lg:grid-cols-4 lg:px-8">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
