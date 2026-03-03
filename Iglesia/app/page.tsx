import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { NewsSection } from "@/components/news-section"
import { EventCalendar } from "@/components/event-calendar"
import { Footer } from "@/components/footer"
import { QuickInfo } from "@/components/quick-info"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Quick info strip */}
        <QuickInfo />

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
            {/* News Column */}
            <NewsSection />

            {/* Calendar Sidebar */}
            <EventCalendar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
