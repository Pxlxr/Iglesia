"use client"

import { useState } from "react"
import Link from "next/link"
import { Church, Menu, X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Noticias", href: "#noticias" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contacto", href: "/contacto" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-navy text-primary-foreground shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gold/20 transition-colors group-hover:bg-gold/30">
            <Church className="size-6 text-gold" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-primary-foreground">Parroquia San Miguel</p>
            <p className="text-xs text-primary-foreground/60">Comunidad de Fe</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-navy-light hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login button desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            size="sm"
            className="border-gold/40 bg-transparent text-gold hover:bg-gold/15 hover:text-gold"
          >
            <LogIn className="size-4" />
            <span>Iniciar Sesion</span>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground/80 hover:bg-navy-light md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-navy-light hover:text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full border-gold/40 bg-transparent text-gold hover:bg-gold/15 hover:text-gold"
          >
            <LogIn className="size-4" />
            <span>Iniciar Sesion</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
