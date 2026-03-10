"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Church, 
  LogOut, 
  Newspaper, 
  CalendarDays, 
  Calendar, 
  ImageIcon,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { isAuthenticated, logout } from "@/lib/auth-store"
import { 
  getContent, 
  addNews, 
  updateNews, 
  deleteNews,
  addCalendarDate,
  deleteCalendarDate,
  addEvent,
  updateEvent,
  deleteEvent,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from "@/lib/content-store"
import { NewsItem, Event, CalendarEvent, GalleryImage } from "@/lib/types"
import { cn } from "@/lib/utils"

const newsTags = ["Reunion", "Formacion", "Liturgia", "Celebracion", "Anuncio"]

export default function AdminPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("noticias")
  
  // Content state
  const [news, setNews] = useState<NewsItem[]>([])
  const [calendarDates, setCalendarDates] = useState<CalendarEvent[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  
  // Dialog states
  const [newsDialogOpen, setNewsDialogOpen] = useState(false)
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  
  // Edit states
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string; title: string } | null>(null)
  
  // Form states
  const [newsForm, setNewsForm] = useState({ date: "", title: "", description: "", tag: "Anuncio" })
  const [eventForm, setEventForm] = useState({ date: "", time: "", title: "", location: "" })
  const [calendarForm, setCalendarForm] = useState({ date: "" })
  const [galleryForm, setGalleryForm] = useState({ src: "", alt: "", description: "" })

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    loadContent()
  }, [router])

  const loadContent = () => {
    const content = getContent()
    setNews(content.news)
    setCalendarDates(content.calendarDates)
    setEvents(content.events)
    setGallery(content.gallery)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // News handlers
  const openNewsDialog = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item)
      setNewsForm({ date: item.date, title: item.title, description: item.description, tag: item.tag })
    } else {
      setEditingNews(null)
      setNewsForm({ date: "", title: "", description: "", tag: "Anuncio" })
    }
    setNewsDialogOpen(true)
  }

  const saveNews = () => {
    if (editingNews) {
      updateNews(editingNews.id, newsForm)
    } else {
      addNews(newsForm)
    }
    setNewsDialogOpen(false)
    loadContent()
  }

  // Event handlers
  const openEventDialog = (item?: Event) => {
    if (item) {
      setEditingEvent(item)
      setEventForm({ date: item.date, time: item.time, title: item.title, location: item.location })
    } else {
      setEditingEvent(null)
      setEventForm({ date: "", time: "", title: "", location: "" })
    }
    setEventDialogOpen(true)
  }

  const saveEvent = () => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventForm)
    } else {
      addEvent(eventForm)
    }
    setEventDialogOpen(false)
    loadContent()
  }

  // Calendar handlers
  const openCalendarDialog = () => {
    setCalendarForm({ date: "" })
    setCalendarDialogOpen(true)
  }

  const saveCalendarDate = () => {
    addCalendarDate(calendarForm.date)
    setCalendarDialogOpen(false)
    loadContent()
  }

  // Gallery handlers
  const openGalleryDialog = (item?: GalleryImage) => {
    if (item) {
      setEditingGallery(item)
      setGalleryForm({ src: item.src, alt: item.alt, description: item.description })
    } else {
      setEditingGallery(null)
      setGalleryForm({ src: "", alt: "", description: "" })
    }
    setGalleryDialogOpen(true)
  }

  const saveGallery = () => {
    if (editingGallery) {
      updateGalleryImage(editingGallery.id, galleryForm)
    } else {
      addGalleryImage(galleryForm)
    }
    setGalleryDialogOpen(false)
    loadContent()
  }

  // Delete handlers
  const openDeleteDialog = (type: string, id: string, title: string) => {
    setDeleteTarget({ type, id, title })
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    
    switch (deleteTarget.type) {
      case "news":
        deleteNews(deleteTarget.id)
        break
      case "event":
        deleteEvent(deleteTarget.id)
        break
      case "calendar":
        deleteCalendarDate(deleteTarget.id)
        break
      case "gallery":
        deleteGalleryImage(deleteTarget.id)
        break
    }
    
    setDeleteDialogOpen(false)
    setDeleteTarget(null)
    loadContent()
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-navy shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gold/20">
              <Church className="size-6 text-gold" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground">Panel de Administracion</p>
              <p className="text-xs text-primary-foreground/60">Parroquia San Miguel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground/80 hover:bg-navy-light hover:text-primary-foreground"
              asChild
            >
              <Link href="/">
                <Home className="size-4" />
                <span className="hidden sm:inline">Ver Sitio</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-gold/40 bg-transparent text-gold hover:bg-gold/15 hover:text-gold"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Cerrar Sesion</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="noticias" className="gap-2">
              <Newspaper className="size-4" />
              <span className="hidden sm:inline">Noticias</span>
            </TabsTrigger>
            <TabsTrigger value="calendario" className="gap-2">
              <CalendarDays className="size-4" />
              <span className="hidden sm:inline">Calendario</span>
            </TabsTrigger>
            <TabsTrigger value="eventos" className="gap-2">
              <Calendar className="size-4" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="galeria" className="gap-2">
              <ImageIcon className="size-4" />
              <span className="hidden sm:inline">Galeria</span>
            </TabsTrigger>
          </TabsList>

          {/* Noticias Tab */}
          <TabsContent value="noticias" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">Noticias y Avisos</h2>
                <p className="text-sm text-muted-foreground">Gestiona las noticias de la parroquia</p>
              </div>
              <Button onClick={() => openNewsDialog()} className="bg-primary">
                <Plus className="size-4" />
                Agregar
              </Button>
            </div>

            <div className="grid gap-4">
              {news.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start justify-between gap-4 p-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          item.tag === "Reunion" && "bg-navy-light/15 text-navy-light",
                          item.tag === "Formacion" && "bg-gold/15 text-gold",
                          item.tag === "Liturgia" && "bg-primary/10 text-primary",
                          item.tag === "Celebracion" && "bg-accent/15 text-accent",
                          !["Reunion", "Formacion", "Liturgia", "Celebracion"].includes(item.tag) && "bg-muted text-muted-foreground"
                        )}>
                          {item.tag}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openNewsDialog(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog("news", item.id, item.title)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {news.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Newspaper className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No hay noticias. Agrega una para comenzar.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Calendario Tab */}
          <TabsContent value="calendario" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">Fechas del Calendario</h2>
                <p className="text-sm text-muted-foreground">Marca fechas importantes en el calendario</p>
              </div>
              <Button onClick={openCalendarDialog} className="bg-primary">
                <Plus className="size-4" />
                Agregar Fecha
              </Button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {calendarDates.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gold/20">
                        <CalendarDays className="size-5 text-gold" />
                      </div>
                      <span className="font-medium">{new Date(item.date + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog("calendar", item.id, item.date)}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {calendarDates.length === 0 && (
                <Card className="sm:col-span-2 lg:col-span-3">
                  <CardContent className="py-12 text-center">
                    <CalendarDays className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No hay fechas marcadas. Agrega una para comenzar.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Eventos Tab */}
          <TabsContent value="eventos" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">Eventos</h2>
                <p className="text-sm text-muted-foreground">Gestiona los proximos eventos</p>
              </div>
              <Button onClick={() => openEventDialog()} className="bg-primary">
                <Plus className="size-4" />
                Agregar
              </Button>
            </div>

            <div className="grid gap-4">
              {events.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start justify-between gap-4 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex shrink-0 flex-col items-center rounded-lg bg-primary px-3 py-2 text-center text-primary-foreground">
                        <span className="text-lg font-bold">{new Date(item.date + 'T12:00:00').getDate()}</span>
                        <span className="text-[10px] font-medium uppercase opacity-75">
                          {new Date(item.date + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short' })}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.time} - {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEventDialog(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog("event", item.id, item.title)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {events.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No hay eventos. Agrega uno para comenzar.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Galeria Tab */}
          <TabsContent value="galeria" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">Galeria de Imagenes</h2>
                <p className="text-sm text-muted-foreground">Administra las imagenes de la galeria</p>
              </div>
              <Button onClick={() => openGalleryDialog()} className="bg-primary">
                <Plus className="size-4" />
                Agregar
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-video bg-muted">
                    {item.src ? (
                      <img src={item.src} alt={item.alt} className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{item.alt || "Sin titulo"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description || "Sin descripcion"}</p>
                    <div className="mt-3 flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openGalleryDialog(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDeleteDialog("gallery", item.id, item.alt)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {gallery.length === 0 && (
                <Card className="sm:col-span-2 lg:col-span-3">
                  <CardContent className="py-12 text-center">
                    <ImageIcon className="mx-auto mb-4 size-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No hay imagenes. Agrega una para comenzar.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* News Dialog */}
      <Dialog open={newsDialogOpen} onOpenChange={setNewsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNews ? "Editar Noticia" : "Nueva Noticia"}</DialogTitle>
            <DialogDescription>
              {editingNews ? "Modifica los datos de la noticia" : "Agrega una nueva noticia al sitio"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="news-date">Fecha</Label>
              <Input
                id="news-date"
                value={newsForm.date}
                onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                placeholder="ej: Lunes, 02 de Marzo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-title">Titulo</Label>
              <Input
                id="news-title"
                value={newsForm.title}
                onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                placeholder="Titulo de la noticia"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-tag">Categoria</Label>
              <Select value={newsForm.tag} onValueChange={(value) => setNewsForm({ ...newsForm, tag: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {newsTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="news-description">Descripcion</Label>
              <Textarea
                id="news-description"
                value={newsForm.description}
                onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                placeholder="Descripcion de la noticia"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewsDialogOpen(false)}>
              <X className="size-4" />
              Cancelar
            </Button>
            <Button onClick={saveNews} disabled={!newsForm.title || !newsForm.date}>
              <Save className="size-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Editar Evento" : "Nuevo Evento"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Modifica los datos del evento" : "Agrega un nuevo evento"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event-date">Fecha</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-time">Hora</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-title">Titulo</Label>
              <Input
                id="event-title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Titulo del evento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-location">Ubicacion</Label>
              <Input
                id="event-location"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                placeholder="Lugar del evento"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDialogOpen(false)}>
              <X className="size-4" />
              Cancelar
            </Button>
            <Button onClick={saveEvent} disabled={!eventForm.title || !eventForm.date || !eventForm.time}>
              <Save className="size-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcar Fecha</DialogTitle>
            <DialogDescription>
              Selecciona una fecha para marcarla en el calendario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="calendar-date">Fecha</Label>
              <Input
                id="calendar-date"
                type="date"
                value={calendarForm.date}
                onChange={(e) => setCalendarForm({ date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCalendarDialogOpen(false)}>
              <X className="size-4" />
              Cancelar
            </Button>
            <Button onClick={saveCalendarDate} disabled={!calendarForm.date}>
              <Save className="size-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={galleryDialogOpen} onOpenChange={setGalleryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGallery ? "Editar Imagen" : "Nueva Imagen"}</DialogTitle>
            <DialogDescription>
              {editingGallery ? "Modifica los datos de la imagen" : "Agrega una nueva imagen a la galeria"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gallery-src">URL de la imagen</Label>
              <Input
                id="gallery-src"
                value={galleryForm.src}
                onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery-alt">Titulo / Alt</Label>
              <Input
                id="gallery-alt"
                value={galleryForm.alt}
                onChange={(e) => setGalleryForm({ ...galleryForm, alt: e.target.value })}
                placeholder="Titulo de la imagen"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery-description">Descripcion</Label>
              <Textarea
                id="gallery-description"
                value={galleryForm.description}
                onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                placeholder="Descripcion de la imagen"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGalleryDialogOpen(false)}>
              <X className="size-4" />
              Cancelar
            </Button>
            <Button onClick={saveGallery} disabled={!galleryForm.src || !galleryForm.alt}>
              <Save className="size-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminacion</DialogTitle>
            <DialogDescription>
              ¿Estas seguro de que deseas eliminar "{deleteTarget?.title}"? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="size-4" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
