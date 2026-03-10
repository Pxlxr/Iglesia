"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
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
  Home,
  Upload,
  Landmark,
  QrCode
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
  deleteGalleryImage,
  getDonationInfo,
  updateDonationInfo
} from "@/lib/content-store"
import { NewsItem, Event, CalendarEvent, GalleryImage, DonationInfo } from "@/lib/types"
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
  const [donation, setDonation] = useState<DonationInfo | null>(null)
  
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
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [donationForm, setDonationForm] = useState({
    bankName: "",
    accountType: "",
    holderName: "",
    rut: "",
    accountNumber: "",
    email: "",
    paypalLink: "",
    paypalQrCode: ""
  })
  const [qrPreview, setQrPreview] = useState<string | null>(null)
  const qrFileInputRef = useRef<HTMLInputElement>(null)

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
    const donationInfo = getDonationInfo()
    setDonation(donationInfo)
    setDonationForm(donationInfo)
    setQrPreview(donationInfo.paypalQrCode || null)
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
      setImagePreview(item.src)
    } else {
      setEditingGallery(null)
      setGalleryForm({ src: "", alt: "", description: "" })
      setImagePreview(null)
    }
    setGalleryDialogOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setGalleryForm({ ...galleryForm, src: base64String })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveGallery = () => {
    if (editingGallery) {
      updateGalleryImage(editingGallery.id, galleryForm)
    } else {
      addGalleryImage(galleryForm)
    }
    setGalleryDialogOpen(false)
    setImagePreview(null)
    loadContent()
  }

  // Donation handlers
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setDonationForm({ ...donationForm, paypalQrCode: base64String })
        setQrPreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveDonation = () => {
    updateDonationInfo(donationForm)
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
            <div className="relative size-12">
              <Image
                src="/images/logo-ingap.png"
                alt="INGAP"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground">Panel de Administracion</p>
              <p className="text-xs text-gold/80">INGAP</p>
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
  <TabsTrigger value="donaciones" className="gap-2">
  <Landmark className="size-4" />
  <span className="hidden sm:inline">Donaciones</span>
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

          {/* Donations Tab */}
          <TabsContent value="donaciones" className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl font-bold">Informacion de Donaciones</h2>
              <p className="text-sm text-muted-foreground">Configura los datos de transferencia y PayPal</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Bank Transfer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="size-5" />
                    Transferencia Bancaria
                  </CardTitle>
                  <CardDescription>Datos para transferencias nacionales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Nombre del Banco</Label>
                    <Input
                      id="bankName"
                      value={donationForm.bankName}
                      onChange={(e) => setDonationForm({ ...donationForm, bankName: e.target.value })}
                      placeholder="Ej: Banco Estado"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Tipo de Cuenta</Label>
                    <Input
                      id="accountType"
                      value={donationForm.accountType}
                      onChange={(e) => setDonationForm({ ...donationForm, accountType: e.target.value })}
                      placeholder="Ej: Cuenta Corriente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="holderName">Nombre del Titular</Label>
                    <Input
                      id="holderName"
                      value={donationForm.holderName}
                      onChange={(e) => setDonationForm({ ...donationForm, holderName: e.target.value })}
                      placeholder="Ej: Iglesia INGAP"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rut">RUT</Label>
                    <Input
                      id="rut"
                      value={donationForm.rut}
                      onChange={(e) => setDonationForm({ ...donationForm, rut: e.target.value })}
                      placeholder="Ej: 12.345.678-9"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Numero de Cuenta</Label>
                    <Input
                      id="accountNumber"
                      value={donationForm.accountNumber}
                      onChange={(e) => setDonationForm({ ...donationForm, accountNumber: e.target.value })}
                      placeholder="Ej: 1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email para Transferencias</Label>
                    <Input
                      id="email"
                      type="email"
                      value={donationForm.email}
                      onChange={(e) => setDonationForm({ ...donationForm, email: e.target.value })}
                      placeholder="Ej: donaciones@ingap.cl"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* PayPal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" fill="#253B80"/>
                    </svg>
                    PayPal
                  </CardTitle>
                  <CardDescription>Configuracion para donaciones internacionales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypalLink">Link de PayPal</Label>
                    <Input
                      id="paypalLink"
                      value={donationForm.paypalLink}
                      onChange={(e) => setDonationForm({ ...donationForm, paypalLink: e.target.value })}
                      placeholder="Ej: https://paypal.me/tuusuario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Codigo QR de PayPal</Label>
                    <input
                      ref={qrFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                    />
                    <div
                      onClick={() => qrFileInputRef.current?.click()}
                      className="relative flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50"
                    >
                      {qrPreview ? (
                        <div className="relative size-full min-h-40">
                          <img
                            src={qrPreview}
                            alt="QR Preview"
                            className="mx-auto h-40 w-auto rounded-lg object-contain"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                            <p className="text-sm font-medium text-white">Cambiar QR</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                            <QrCode className="size-6 text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">Click para subir codigo QR</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG hasta 2MB</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={saveDonation} className="bg-primary">
                <Save className="size-4" />
                Guardar Cambios
              </Button>
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
      <Dialog open={galleryDialogOpen} onOpenChange={(open) => {
        setGalleryDialogOpen(open)
        if (!open) setImagePreview(null)
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingGallery ? "Editar Imagen" : "Nueva Imagen"}</DialogTitle>
            <DialogDescription>
              {editingGallery ? "Modifica los datos de la imagen" : "Sube una imagen desde tu computador"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Imagen</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50"
              >
                {imagePreview ? (
                  <div className="relative size-full min-h-40">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="size-full rounded-lg object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                      <p className="text-sm font-medium text-white">Cambiar imagen</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Upload className="size-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Click para subir imagen</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery-alt">Titulo</Label>
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
            <Button variant="outline" onClick={() => {
              setGalleryDialogOpen(false)
              setImagePreview(null)
            }}>
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
