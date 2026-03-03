"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/images/church-1.jpg",
    alt: "Interior de la Parroquia San Miguel",
    title: "Bienvenidos a nuestra comunidad",
    subtitle: "Un lugar de fe, esperanza y amor",
  },
  {
    src: "/images/church-2.jpg",
    alt: "Exterior de la Parroquia",
    title: "Celebremos juntos",
    subtitle: "Horarios de misa: Domingos 8:00, 10:00 y 12:00",
  },
  {
    src: "/images/church-3.jpg",
    alt: "Comunidad parroquial reunida",
    title: "Comunidad unida",
    subtitle: "Actividades y eventos para toda la familia",
  },
  {
    src: "/images/church-4.jpg",
    alt: "Coro de la parroquia",
    title: "Ministerio de Musica",
    subtitle: "Alabamos al Senor con alegria",
  },
]

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  // Autoplay
  useEffect(() => {
    if (!api) return
    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [api])

  return (
    <section id="inicio" className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative pl-0">
              <div className="relative h-[340px] w-full overflow-hidden sm:h-[440px] lg:h-[520px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                {/* Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center sm:pb-20">
                  <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
                    {slide.title}
                  </h2>
                  <p className="max-w-lg px-4 text-sm text-primary-foreground/80 sm:text-base lg:text-lg">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom nav arrows */}
        <button
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/50 text-primary-foreground/80 backdrop-blur-sm transition-colors hover:bg-navy/70 sm:size-12"
          onClick={() => api?.scrollPrev()}
          aria-label="Slide anterior"
        >
          <ChevronLeft className="size-5 sm:size-6" />
        </button>
        <button
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/50 text-primary-foreground/80 backdrop-blur-sm transition-colors hover:bg-navy/70 sm:size-12"
          onClick={() => api?.scrollNext()}
          aria-label="Siguiente slide"
        >
          <ChevronRight className="size-5 sm:size-6" />
        </button>
      </Carousel>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === index
                ? "w-8 bg-gold"
                : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
