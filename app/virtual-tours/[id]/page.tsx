import { Navigation } from "@/components/navigation"
import { VirtualTourViewer } from "@/components/virtual-tour-viewer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface VirtualTourPageProps {
  params: Promise<{ id: string }>
}

export default async function VirtualTourPage({ params }: VirtualTourPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: monastery, error } = await supabase.from("monasteries").select("*").eq("id", id).single()

  if (error || !monastery) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <VirtualTourViewer monastery={monastery} />
    </main>
  )
}
