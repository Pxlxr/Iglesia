"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, MessageCircleQuestion } from "lucide-react"

type Answer = "si" | "no" | null

export function SurveyCard() {
  const [answer, setAnswer] = useState<Answer>(null)

  if (answer) {
    return (
      <Card className="border-border/60 bg-card shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div
            className={`flex size-14 items-center justify-center rounded-full ${
              answer === "si" ? "bg-emerald-100" : "bg-red-100"
            }`}
          >
            {answer === "si" ? (
              <CheckCircle2 className="size-7 text-emerald-600" />
            ) : (
              <XCircle className="size-7 text-red-500" />
            )}
          </div>
          <p className="text-sm font-semibold text-foreground">
            {answer === "si"
              ? "Nos alegra que nos conozcas."
              : "Gracias por tu respuesta. Esperamos que nos conozcas pronto."}
          </p>
          <button
            className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
            onClick={() => setAnswer(null)}
          >
            Cambiar respuesta
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3 text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <MessageCircleQuestion className="size-6 text-primary" />
        </div>
        <CardTitle className="text-base font-bold text-foreground">
          Encuesta rapida
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <p className="text-center text-sm font-medium text-foreground">
          {"Has escuchado de nosotros?"}
        </p>

        <div className="flex w-full gap-3">
          {/* SI button */}
          <Button
            onClick={() => setAnswer("si")}
            className="flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            size="lg"
          >
            <CheckCircle2 className="size-5" />
            Si
          </Button>

          {/* NO button */}
          <Button
            onClick={() => setAnswer("no")}
            variant="destructive"
            className="flex-1 gap-2"
            size="lg"
          >
            <XCircle className="size-5" />
            No
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Tu respuesta nos ayuda a mejorar nuestro alcance comunitario.
        </p>
      </CardContent>
    </Card>
  )
}
