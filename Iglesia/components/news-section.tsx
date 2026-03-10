"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getContent } from "@/lib/content-store"
import { NewsItem } from "@/lib/types"

const tagColors: Record<string, string> = {
  Reunion: "bg-navy-light/15 text-navy-light",
  Formacion: "bg-gold/15 text-gold",
  Liturgia: "bg-primary/10 text-primary",
  Celebracion: "bg-accent/15 text-accent",
}

export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const content = getContent()
    setNewsItems(content.news)
  }, [])

  // Listen for storage changes (for real-time updates when admin changes content)
  useEffect(() => {
    const handleStorage = () => {
      const content = getContent()
      setNewsItems(content.news)
    }
    
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  if (!mounted) {
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
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/60 bg-card py-0">
              <CardContent className="flex gap-4 p-4 sm:p-5">
                <div className="hidden h-16 w-14 shrink-0 animate-pulse rounded-xl bg-muted sm:block" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

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
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <Card
              key={item.id}
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
          ))
        ) : (
          <Card className="border-border/60 bg-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No hay noticias disponibles.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
