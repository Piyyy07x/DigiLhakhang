import { Navigation } from "@/components/navigation"
import { VirtualToursGrid } from "@/components/virtual-tours-grid"
import { createClient } from "@/lib/supabase/server"

export default async function VirtualToursPage() {
  const supabase = await createClient()

  const { data: monasteries, error } = await supabase
    .from("monasteries")
    .select("*")
    .not("virtual_tour_url", "is", null)
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Virtual Tours</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Experience the sacred beauty of Sikkim's monasteries through immersive 360° virtual tours. Walk through
              ancient halls, admire intricate artwork, and feel the spiritual atmosphere from anywhere in the world.
            </p>
          </div>

          <VirtualToursGrid monasteries={monasteries || []} />
        </div>
      </div>
    </main>
  )
}
