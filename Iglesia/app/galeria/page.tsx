"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ImageIcon, X } from "lucide-react"
import { getContent } from "@/lib/content-store"
import { GalleryImage } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function GaleriaPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    setMounted(true)
    const content = getContent()
    setGallery(content.gallery)
  }, [])

  // Listen for storage changes
  useEffect(() => {
    const handleStorage = () => {
      const content = getContent()
      setGallery(content.gallery)
    }
    
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden bg-navy py-16 lg:py-24">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute -left-40 -top-40 size-80 animate-pulse rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 size-80 animate-pulse rounded-full bg-primary/10 blur-3xl" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              Galeria de Imagenes
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
              Momentos especiales de nuestra comunidad parroquial
            </p>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          {!mounted ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : gallery.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <Card
                  key={image.id}
                  className={cn(
                    "group cursor-pointer overflow-hidden border-border/60 bg-card transition-all duration-500 hover:shadow-xl",
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {image.src ? (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-16 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="font-semibold">{image.alt || "Sin titulo"}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{image.alt || "Sin titulo"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {image.description || "Sin descripcion"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="size-12 text-muted-foreground/50" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                No hay imagenes en la galeria
              </h2>
              <p className="mt-2 text-muted-foreground">
                Las imagenes agregadas desde el panel de administracion apareceran aqui.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Imagen de la galeria"}
          </DialogTitle>
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -right-2 -top-10 flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <X className="size-5" />
              </button>
              <div className="overflow-hidden rounded-xl bg-card">
                {selectedImage.src ? (
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[70vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted">
                    <ImageIcon className="size-24 text-muted-foreground/30" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {selectedImage.alt || "Sin titulo"}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {selectedImage.description || "Sin descripcion"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
