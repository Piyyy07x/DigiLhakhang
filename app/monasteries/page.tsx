import { Navigation } from "@/components/navigation"
import { MonasteriesGrid } from "@/components/monasteries-grid"
import { createClient } from "@/lib/supabase/server"

export default async function MonasteriesPage() {
  const supabase = await createClient()

  const { data: monasteries, error } = await supabase.from("monasteries").select("*").order("name")

  if (error) {
    console.error("Error fetching monasteries:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">All Monasteries</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Explore the complete collection of Sikkim's sacred monasteries, each with its unique history, traditions,
              and spiritual significance.
            </p>
          </div>

          <MonasteriesGrid monasteries={monasteries || []} />
        </div>
      </div>
    </main>
  )
}
