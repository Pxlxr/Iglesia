"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { es } from "date-fns/locale"
import { getContent } from "@/lib/content-store"
import { Event, CalendarEvent } from "@/lib/types"

export function EventCalendar() {
  const [date, setDate] = useState<Date>(new Date(2026, 2, 1))
  const [eventDates, setEventDates] = useState<Date[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadContent()
  }, [])

  // Listen for storage changes
  useEffect(() => {
    const handleStorage = () => {
      loadContent()
    }
    
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const loadContent = () => {
    const content = getContent()
    setEvents(content.events)
    setEventDates(content.calendarDates.map((c: CalendarEvent) => new Date(c.date + 'T12:00:00')))
  }

  // Format events for display
  const upcomingEvents = events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4)
    .map((event) => {
      const eventDate = new Date(event.date + 'T12:00:00')
      return {
        day: eventDate.getDate().toString().padStart(2, '0'),
        month: eventDate.toLocaleDateString('es-ES', { month: 'short' }).charAt(0).toUpperCase() + 
               eventDate.toLocaleDateString('es-ES', { month: 'short' }).slice(1),
        title: event.title,
        time: event.time,
        location: event.location,
      }
    })

  if (!mounted) {
    return (
      <aside className="flex flex-col gap-4" id="eventos">
        <Card className="border-border/60 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <CalendarDays className="size-4 text-primary" />
              Calendario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
          </CardContent>
        </Card>
      </aside>
    )
  }

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
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
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
            ))
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No hay eventos programados.
            </p>
          )}
        </CardContent>
      </Card>
    </aside>
  )
}
