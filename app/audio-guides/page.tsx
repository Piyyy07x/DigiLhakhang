import { Navigation } from "@/components/navigation"
import { AudioGuidesGrid } from "@/components/audio-guides-grid"
import { createClient } from "@/lib/supabase/server"

export default async function AudioGuidesPage() {
  const supabase = await createClient()

  const { data: monasteries, error } = await supabase
    .from("monasteries")
    .select("*")
    .not("audio_guide_urls", "eq", "{}")
    .order("name")

  if (error) {
    console.error("Error fetching monasteries:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Audio Guides</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Listen to expertly narrated stories about Sikkim's sacred monasteries in multiple languages. Discover the
              history, traditions, and spiritual significance of each holy site.
            </p>
          </div>

          <AudioGuidesGrid monasteries={monasteries || []} />
        </div>
      </div>
    </main>
  )
}
