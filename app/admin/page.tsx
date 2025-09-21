import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", data.user.id).single()

  if (!adminUser) {
    redirect("/auth/login")
  }

  // Get monasteries data
  const { data: monasteries } = await supabase.from("monasteries").select("*").order("created_at", { ascending: false })

  return <AdminDashboard user={data.user} monasteries={monasteries || []} />
}
