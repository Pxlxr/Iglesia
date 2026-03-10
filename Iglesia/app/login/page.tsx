"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Church, Eye, EyeOff, Lock, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login, isAuthenticated } from "@/lib/auth-store"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated()) {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 800))

    const result = login(username, password)
    if (result.success) {
      router.push("/admin")
    } else {
      setError(result.error || "Error al iniciar sesion")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -left-40 -top-40 size-80 animate-pulse rounded-full bg-gold/10 blur-3xl" />
        <div className="animation-delay-2000 absolute -bottom-40 -right-40 size-80 animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div className="animation-delay-4000 absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-navy-light/20 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {mounted && [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute size-1 animate-float rounded-full bg-gold/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-navy-light hover:text-primary-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Link>

      {/* Login card */}
      <Card className={cn(
        "relative z-10 w-full max-w-md border-navy-light/30 bg-navy-light/40 shadow-2xl backdrop-blur-xl transition-all duration-700",
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        <CardHeader className="space-y-4 text-center">
          {/* Logo placeholder */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/20 ring-2 ring-gold/30 transition-transform hover:scale-105">
            <Church className="size-8 text-gold" />
          </div>
          <div>
            <CardTitle className="font-serif text-2xl font-bold text-primary-foreground">
              Panel de Administracion
            </CardTitle>
            <CardDescription className="mt-2 text-primary-foreground/60">
              Ingresa tus credenciales para continuar
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Username field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-primary-foreground/80">
                Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/40" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="border-navy-light/50 bg-navy/50 pl-10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold/50 focus:ring-gold/20"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-foreground/80">
                Contrasena
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  className="border-navy-light/50 bg-navy/50 pl-10 pr-10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold/50 focus:ring-gold/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 transition-colors hover:text-primary-foreground/70"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gold text-navy hover:bg-gold/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy" />
                  Verificando...
                </span>
              ) : (
                "Iniciar Sesion"
              )}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 rounded-lg bg-navy/50 p-3 text-center text-xs text-primary-foreground/50">
            <p>Credenciales de prueba:</p>
            <p className="mt-1 font-mono">admin / admin123</p>
          </div>
        </CardContent>
      </Card>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
