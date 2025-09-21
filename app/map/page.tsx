import { Navigation } from "@/components/navigation"
import { InteractiveMap } from "@/components/interactive-map"
import { createClient } from "@/lib/supabase/server"

export default async function MapPage() {
  const supabase = await createClient()

  const { data: monasteries, error } = await supabase
    .from("monasteries")
    .select("*")
    .not("latitude", "is", null)
    .not("longitude", "is", null)
    .order("name")

  if (error) {
    console.error("Error fetching monasteries:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <InteractiveMap monasteries={monasteries || []} />
      </div>
    </main>
  )
}
