"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, Mail, User, Phone } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="border-border/60 bg-card">
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="size-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Mensaje enviado
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Gracias por contactarnos,{" "}
            <span className="font-semibold text-foreground">
              {formData.nombre}
            </span>
            . Nos pondremos en contacto contigo pronto.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setSubmitted(false)
              setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" })
            }}
          >
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Mail className="size-5 text-primary" />
          Formulario de Contacto
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Completa los campos y te responderemos a la brevedad.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
              Nombre completo
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej: Juan Perez"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="correo" className="text-sm font-medium text-foreground">
              Correo electronico
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="correo"
                name="correo"
                type="email"
                placeholder="Ej: juan@correo.com"
                value={formData.correo}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          {/* Telefono */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="telefono" className="text-sm font-medium text-foreground">
              Numero de telefono
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Ej: +52 555 123 4567"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="mensaje" className="text-sm font-medium text-foreground">
              Mensaje
            </Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribe tu consulta o mensaje aqui..."
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={5}
              className="resize-none"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="size-4" />
            Enviar mensaje
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
