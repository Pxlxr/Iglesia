"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { es } from "date-fns/locale"

const eventDates = [
  new Date(2026, 2, 2),
  new Date(2026, 2, 10),
  new Date(2026, 2, 13),
  new Date(2026, 2, 19),
  new Date(2026, 2, 22),
  new Date(2026, 2, 29),
]

const upcomingEvents = [
  {
    day: "02",
    month: "Mar",
    title: "Consejo Parroquial",
    time: "18:00",
    location: "Salon Parroquial",
  },
  {
    day: "10",
    month: "Mar",
    title: "Catequesis",
    time: "16:00",
    location: "Aula 1",
  },
  {
    day: "13",
    month: "Mar",
    title: "Via Crucis",
    time: "17:30",
    location: "Atrio principal",
  },
  {
    day: "19",
    month: "Mar",
    title: "Misa de San Jose",
    time: "10:00",
    location: "Templo principal",
  },
]

export function EventCalendar() {
  const [date, setDate] = useState<Date>(new Date(2026, 2, 1))

  return (
    <aside className="flex flex-col gap-4" id="eventos">
      {/* Calendar */}
      <Card className="border-border/60 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <CalendarDays className="size-4 text-primary" />
            Calendario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            defaultMonth={new Date(2026, 2)}
            locale={es}
            modifiers={{ event: eventDates }}
            modifiersClassNames={{
              event: "!bg-gold/20 !text-foreground font-bold",
            }}
            className="w-full rounded-lg p-0 [--cell-size:--spacing(9)]"
          />
        </CardContent>
      </Card>

      {/* Upcoming events */}
      <Card className="border-border/60 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground">
            Proximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              {/* Date chip */}
              <div className="flex shrink-0 flex-col items-center rounded-lg bg-primary px-2.5 py-1.5 text-center text-primary-foreground">
                <span className="text-lg font-bold leading-tight">
                  {event.day}
                </span>
                <span className="text-[10px] font-medium uppercase leading-tight opacity-75">
                  {event.month}
                </span>
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-tight text-foreground">
                  {event.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
