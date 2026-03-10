import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LoadingScreen } from '@/components/loading-screen'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-merriweather" });

export const metadata: Metadata = {
  title: 'INGAP - Viviendo el Nuevo Pacto',
  description: 'Bienvenidos a INGAP. Viviendo el Nuevo Pacto. Eventos, noticias y calendario de la iglesia.',
  icons: {
    icon: [
      {
        url: '/images/logo-ingap.png',
      },
    ],
    apple: '/images/logo-ingap.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${_inter.variable} ${_merriweather.variable} font-sans antialiased`}>
        <LoadingScreen />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
