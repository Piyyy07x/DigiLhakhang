"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Edit,
  Trash2,
  Mountain,
  Users,
  MapPin,
  BarChart3,
  LogOut,
  Save,
  X,
  Eye,
  Play,
  Headphones,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Monastery } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

interface AdminDashboardProps {
  user: User
  monasteries: Monastery[]
}

export function AdminDashboard({ user, monasteries }: AdminDashboardProps) {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const stats = {
    totalMonasteries: monasteries.length,
    withVirtualTours: monasteries.filter((m) => m.virtual_tour_url).length,
    withAudioGuides: monasteries.filter((m) => m.audio_guide_urls && Object.keys(m.audio_guide_urls).length > 0).length,
    traditions: Array.from(new Set(monasteries.map((m) => m.tradition).filter(Boolean))).length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-amber-600" />
              <span className="font-bold text-xl">Monastery360 Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monasteries">Monasteries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Monasteries</CardTitle>
                  <Mountain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMonasteries}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Virtual Tours</CardTitle>
                  <Play className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.withVirtualTours}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Audio Guides</CardTitle>
                  <Headphones className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.withAudioGuides}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Traditions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.traditions}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Monasteries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Monasteries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monasteries.slice(0, 5).map((monastery) => (
                    <div key={monastery.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={monastery.images[0] || "/placeholder.svg?height=48&width=48"}
                          alt={monastery.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{monastery.name}</h3>
                        <p className="text-sm text-muted-foreground">{monastery.location}</p>
                      </div>
                      <Badge variant="outline">{monastery.tradition}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedMonastery(monastery)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monasteries Tab */}
          <TabsContent value="monasteries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Monasteries</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Monastery
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Monastery</DialogTitle>
                  </DialogHeader>
                  <MonasteryForm onClose={() => setIsAddDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monasteries.map((monastery) => (
                <Card key={monastery.id} className="overflow-hidden">
                  <div className="relative h-32">
                    <img
                      src={monastery.images[0] || "/placeholder.svg?height=128&width=300"}
                      alt={monastery.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-amber-600 text-white">
                        {monastery.tradition}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{monastery.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {monastery.location}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      {monastery.virtual_tour_url && (
                        <Badge variant="outline" className="text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          360°
                        </Badge>
                      )}
                      {monastery.audio_guide_urls && Object.keys(monastery.audio_guide_urls).length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Headphones className="h-3 w-3 mr-1" />
                          Audio
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          setSelectedMonastery(monastery)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Monasteries by Tradition</h3>
                    <div className="space-y-2">
                      {Array.from(new Set(monasteries.map((m) => m.tradition).filter(Boolean))).map((tradition) => {
                        const count = monasteries.filter((m) => m.tradition === tradition).length
                        const percentage = ((count / monasteries.length) * 100).toFixed(1)
                        return (
                          <div key={tradition} className="flex justify-between items-center">
                            <span className="text-sm">{tradition}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground w-12">{count}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Content Availability</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Virtual Tours</span>
                        <span className="text-sm font-medium">
                          {stats.withVirtualTours}/{stats.totalMonasteries}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Audio Guides</span>
                        <span className="text-sm font-medium">
                          {stats.withAudioGuides}/{stats.totalMonasteries}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Complete Profiles</span>
                        <span className="text-sm font-medium">
                          {monasteries.filter((m) => m.description && m.significance).length}/{stats.totalMonasteries}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Monastery</DialogTitle>
            </DialogHeader>
            {selectedMonastery && (
              <MonasteryForm
                monastery={selectedMonastery}
                onClose={() => {
                  setIsEditDialogOpen(false)
                  setSelectedMonastery(null)
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Monastery Form Component
function MonasteryForm({ monastery, onClose }: { monastery?: Monastery; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: monastery?.name || "",
    description: monastery?.description || "",
    location: monastery?.location || "",
    latitude: monastery?.latitude?.toString() || "",
    longitude: monastery?.longitude?.toString() || "",
    altitude: monastery?.altitude?.toString() || "",
    founded_year: monastery?.founded_year?.toString() || "",
    tradition: monastery?.tradition || "",
    main_deity: monastery?.main_deity || "",
    significance: monastery?.significance || "",
    visiting_hours: monastery?.visiting_hours || "",
    entry_fee: monastery?.entry_fee || "",
    virtual_tour_url: monastery?.virtual_tour_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the actual save logic
    console.log("Saving monastery:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="altitude">Altitude (m)</Label>
          <Input
            id="altitude"
            type="number"
            value={formData.altitude}
            onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="founded_year">Founded Year</Label>
          <Input
            id="founded_year"
            type="number"
            value={formData.founded_year}
            onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="tradition">Tradition</Label>
          <Select value={formData.tradition} onValueChange={(value) => setFormData({ ...formData, tradition: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select tradition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nyingma">Nyingma</SelectItem>
              <SelectItem value="Kagyu">Kagyu</SelectItem>
              <SelectItem value="Gelug">Gelug</SelectItem>
              <SelectItem value="Sakya">Sakya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </form>
  )
}
