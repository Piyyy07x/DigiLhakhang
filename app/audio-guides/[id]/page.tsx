import { Navigation } from "@/components/navigation"
import { AudioGuidePlayer } from "@/components/audio-guide-player"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface AudioGuidePageProps {
  params: Promise<{ id: string }>
}

export default async function AudioGuidePage({ params }: AudioGuidePageProps) {
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
        <AudioGuidePlayer monastery={monastery} />
      </div>
    </main>
  )
}
