import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"
import { SurveyCard } from "@/components/survey-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto - Parroquia San Miguel",
  description:
    "Ponte en contacto con la Parroquia San Miguel. Envianos tu mensaje, consulta o solicitud.",
}

export default function ContactoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-navy py-6 text-center text-primary-foreground">
          <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-4">
            <h1 className="text-balance font-serif text-xl font-bold tracking-tight sm:text-2xl">
              Contacto
            </h1>
            <span className="hidden text-primary-foreground/40 sm:inline">|</span>
            <p className="hidden text-pretty text-sm text-primary-foreground/70 sm:inline">
              Envianos tu mensaje y nos pondremos en contacto contigo.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Contact Form */}
            <div className="flex-1">
              <ContactForm />
            </div>

            {/* Sidebar - Survey */}
            <aside className="w-full lg:w-80">
              <SurveyCard />
            </aside>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-navy py-6 text-center text-sm text-primary-foreground/50">
        <p>Parroquia San Miguel - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
