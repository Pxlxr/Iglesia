import { Church, MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Noticias", href: "#noticias" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contacto", href: "#contacto" },
]

const services = [
  "Misa Dominical",
  "Bautizos",
  "Primera Comunion",
  "Confirmacion",
  "Matrimonios",
  "Confesiones",
]

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground" id="contacto">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gold/20">
                <Church className="size-5 text-gold" />
              </div>
              <div>
                <p className="font-serif font-bold text-primary-foreground">
                  Parroquia San Miguel
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Somos una comunidad de fe comprometida con el servicio a Dios y al
              projimo. Abiertos a todos los que deseen crecer espiritualmente en
              un ambiente de amor y fraternidad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Enlaces
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-primary-foreground/60"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/60" />
                <span>Av. Principal #123, Col. Centro, CP 62000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
                <Phone className="size-4 shrink-0 text-gold/60" />
                <span>+52 (777) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-primary-foreground/60">
                <Mail className="size-4 shrink-0 text-gold/60" />
                <span>contacto@parroquiasanmiguel.org</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/60">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold/60" />
                <div>
                  <p>Lun - Vie: 8:00 - 18:00</p>
                  <p>Sab - Dom: 7:00 - 20:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-primary-foreground/40 sm:flex-row lg:px-8">
          <p>
            {"© 2026 Parroquia San Miguel. Todos los derechos reservados."}
          </p>
          <p>Desarrollado con fe y dedicacion</p>
        </div>
      </div>
    </footer>
  )
}
