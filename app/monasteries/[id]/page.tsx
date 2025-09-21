import { Navigation } from "@/components/navigation"
import { MonasteryDetails } from "@/components/monastery-details"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface MonasteryPageProps {
  params: Promise<{ id: string }>
}

export default async function MonasteryPage({ params }: MonasteryPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: monastery, error } = await supabase.from("monasteries").select("*").eq("id", id).single()

  if (error || !monastery) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <MonasteryDetails monastery={monastery} />
      </div>
    </main>
  )
}
