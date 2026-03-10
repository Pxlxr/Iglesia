"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Landmark, User, CreditCard, Mail, Copy, Check, ExternalLink, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { getDonationInfo } from "@/lib/content-store"
import { DonationInfo } from "@/lib/types"

export default function DonacionesPage() {
  const [donation, setDonation] = useState<DonationInfo | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const info = getDonationInfo()
    setDonation(info)
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  if (!donation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    )
  }

  const bankFields = [
    { icon: Landmark, label: donation.bankName, value: donation.accountType, field: "bank" },
    { icon: User, label: "Titular", value: donation.holderName, field: "holder" },
    { icon: CreditCard, label: "RUT", value: donation.rut, field: "rut" },
    { icon: CreditCard, label: "N° de Cuenta", value: donation.accountNumber, field: "account" },
    { icon: Mail, label: "Email", value: donation.email, field: "email" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 relative size-20">
            <Image
              src="/images/logo-ingap.png"
              alt="INGAP"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Apoya Nuestra Mision
          </h1>
          <p className="mt-3 text-muted-foreground">
            Tu generosidad nos ayuda a continuar con nuestra labor
          </p>
        </div>

        {/* Bank Transfer Card */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl">
          <CardHeader className="bg-navy px-6 py-4">
            <CardTitle className="text-lg font-semibold text-white">
              Dona aqui con transferencias
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Icon and title */}
              <div className="flex flex-col items-center justify-center bg-gold/10 p-8 md:w-1/3">
                <div className="flex size-16 items-center justify-center rounded-xl bg-gold/20">
                  <Landmark className="size-8 text-gold" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Datos para</p>
                <p className="font-serif text-xl font-bold text-foreground">Transferencia</p>
              </div>
              
              {/* Right side - Bank details */}
              <div className="flex-1 p-6">
                <h3 className="mb-4 font-semibold text-foreground">
                  Datos para tu transferencia bancaria
                </h3>
                <div className="space-y-3">
                  {bankFields.map((item) => (
                    <div
                      key={item.field}
                      className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="size-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.value}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(item.value, item.field)}
                          className="h-8 border-border bg-background hover:bg-muted"
                        >
                          {copiedField === item.field ? (
                            <>
                              <Check className="size-3 text-green-500" />
                              <span className="text-xs">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span className="text-xs">Copiar</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Boletin</span>
                  <form onSubmit={handleSubscribe} className="ml-auto flex items-center gap-2">
                    <Input
                      type="email"
                      placeholder="Escribe un email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-8 w-40 border-border bg-background text-sm"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="h-8 border-border bg-background hover:bg-muted"
                    >
                      {subscribed ? "Suscrito!" : "Suscribirse"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative text */}
        <p className="mb-8 text-muted-foreground">O tambien puedes...</p>

        {/* PayPal Card */}
        <Card className="overflow-hidden border-2 border-border shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
              <div className="mb-6 md:mb-0 md:flex-1">
                {/* PayPal Logo */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <svg className="h-8" viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.211 6.749H39.09c-.466 0-.869.335-.945.793L35.5 23.374c-.055.352.218.668.578.668h3.414c.465 0 .868-.335.945-.793l.714-4.533c.076-.458.479-.794.945-.794h2.178c4.535 0 7.151-2.193 7.833-6.54.307-1.901.013-3.396-.871-4.444-1.04-1.156-2.937-1.189-5.025-1.189zm.796 6.444c-.376 2.459-2.257 2.459-4.078 2.459h-1.035l.727-4.603c.044-.277.285-.481.566-.481h.474c1.24 0 2.41 0 3.015.706.359.42.469 1.04.331 1.919zM69.654 13.122h-3.429c-.281 0-.522.204-.566.481l-.151.96-.24-.347c-.743-1.079-2.399-1.44-4.052-1.44-3.79 0-7.027 2.872-7.658 6.897-.328 2.01.137 3.931 1.275 5.27 1.045 1.232 2.536 1.745 4.312 1.745 3.051 0 4.743-1.961 4.743-1.961l-.153.953c-.056.352.217.668.577.668h3.091c.466 0 .869-.335.945-.793l1.851-11.725c.056-.352-.217-.668-.577-.668h.032zm-4.777 6.676c-.332 1.965-1.893 3.284-3.89 3.284-1.003 0-1.804-.323-2.316-.933-.508-.606-.7-1.47-.538-2.432.311-1.948 1.898-3.31 3.859-3.31.981 0 1.778.327 2.301.944.524.623.729 1.492.584 2.447zM90.992 13.122h-3.445c-.316 0-.613.158-.789.423l-4.548 6.702-1.928-6.441c-.121-.4-.493-.684-.912-.684h-3.385c-.393 0-.668.386-.544.757l3.633 10.658-3.418 4.823c-.27.381.006.901.468.901h3.441c.314 0 .609-.155.787-.417l10.966-15.835c.264-.378-.008-.887-.464-.887h.138z" fill="#253B80"/>
                    <path d="M104.456 6.749h-7.121c-.466 0-.869.335-.945.793l-2.645 16.832c-.055.352.218.668.578.668h3.649c.326 0 .605-.233.66-.554l.75-4.772c.076-.458.479-.794.945-.794h2.178c4.535 0 7.151-2.193 7.833-6.54.307-1.901.012-3.396-.872-4.444-1.039-1.156-2.936-1.189-5.01-1.189zm.796 6.444c-.376 2.459-2.257 2.459-4.078 2.459h-1.035l.726-4.603c.044-.277.286-.481.566-.481h.475c1.24 0 2.41 0 3.014.706.36.42.469 1.04.332 1.919zM127.9 13.122h-3.429c-.281 0-.521.204-.566.481l-.151.96-.239-.347c-.744-1.079-2.4-1.44-4.053-1.44-3.79 0-7.027 2.872-7.658 6.897-.328 2.01.138 3.931 1.276 5.27 1.044 1.232 2.536 1.745 4.311 1.745 3.051 0 4.744-1.961 4.744-1.961l-.153.953c-.055.352.218.668.578.668h3.091c.466 0 .868-.335.945-.793l1.85-11.725c.056-.352-.217-.668-.578-.668h.032zm-4.777 6.676c-.331 1.965-1.893 3.284-3.89 3.284-1.002 0-1.804-.323-2.315-.933-.509-.606-.7-1.47-.539-2.432.311-1.948 1.898-3.31 3.859-3.31.982 0 1.779.327 2.301.944.525.623.73 1.492.584 2.447z" fill="#179BD7"/>
                    <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292c.011-.072.049-.139.104-.183a.282.282 0 01.178-.066h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 011.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 01-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 00-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 01-.096.035H7.266z" fill="#253B80"/>
                    <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 00.695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 00-1.336-1.03z" fill="#179BD7"/>
                    <path d="M21.754 7.151a9.757 9.757 0 00-1.203-.267 15.284 15.284 0 00-2.426-.176h-7.352a1.172 1.172 0 00-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 011.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 00-1.017-.413l-.277-.103z" fill="#222D65"/>
                  </svg>
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  Dona de forma segura desde el extranjero
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Puedes usar tu tarjeta de credito o debito a traves de la plataforma segura de PayPal.
                </p>
                <Button
                  asChild
                  className="bg-gold px-8 py-3 font-semibold text-navy hover:bg-gold/90"
                >
                  <a href={donation.paypalLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 size-4" />
                    Donar con PayPal
                  </a>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Seras redirigido a una pagina segura.
                </p>
              </div>
              
              {/* QR Code section */}
              <div className="flex flex-col items-center md:ml-8">
                {donation.paypalQrCode ? (
                  <div className="relative size-32 overflow-hidden rounded-lg border-2 border-border">
                    <img
                      src={donation.paypalQrCode}
                      alt="QR Code PayPal"
                      className="size-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex size-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <QrCode className="size-12 text-muted-foreground/50" />
                  </div>
                )}
                <p className="mt-2 text-xs text-muted-foreground">O escanea el codigo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/">
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
