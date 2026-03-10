"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    // Remove loading screen after fade animation
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-opacity duration-700",
        fadeOut ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-96 animate-pulse rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-96 animate-pulse rounded-full bg-gold/5 blur-3xl" style={{ animationDelay: "0.5s" }} />
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-gold/10" style={{ animationDuration: "20s" }} />
        <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-gold/15" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
      </div>

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with animation */}
        <div className="relative animate-fade-in-up">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 animate-pulse blur-2xl">
            <div className="size-full rounded-full bg-gold/20" />
          </div>
          
          {/* Logo image */}
          <div className="relative animate-float">
            <Image
              src="/images/logo-ingap.png"
              alt="INGAP - Viviendo el Nuevo Pacto"
              width={280}
              height={280}
              className="drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          {/* Animated dots */}
          <div className="flex items-center gap-2">
            <span className="size-2 animate-bounce rounded-full bg-gold" style={{ animationDelay: "0ms" }} />
            <span className="size-2 animate-bounce rounded-full bg-gold" style={{ animationDelay: "150ms" }} />
            <span className="size-2 animate-bounce rounded-full bg-gold" style={{ animationDelay: "300ms" }} />
          </div>
          
          {/* Loading text */}
          <p className="font-serif text-sm tracking-widest text-gold/80 uppercase">
            Cargando...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
