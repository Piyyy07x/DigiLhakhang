"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Mountain, Search, Filter, Eye, Play, Headphones } from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface MonasteriesGridProps {
  monasteries: Monastery[]
}

export function MonasteriesGrid({ monasteries }: MonasteriesGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [traditionFilter, setTraditionFilter] = useState("all")

  // Get unique traditions for filter
  const traditions = Array.from(new Set(monasteries.map((m) => m.tradition).filter(Boolean)))

  // Filter monasteries
  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch =
      monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTradition = traditionFilter === "all" || monastery.tradition === traditionFilter

    return matchesSearch && matchesTradition
  })

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search monasteries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={traditionFilter} onValueChange={setTraditionFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by tradition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Traditions</SelectItem>
            {traditions.map((tradition) => (
              <SelectItem key={tradition} value={tradition || ""}>
                {tradition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredMonasteries.length} of {monasteries.length} monasteries
        </p>
      </div>

      {/* Monasteries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMonasteries.map((monastery) => (
          <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={monastery.images[0] || "/placeholder.svg?height=300&width=400"}
                alt={monastery.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Tradition Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-amber-600 text-white">
                  {monastery.tradition}
                </Badge>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                {monastery.virtual_tour_url && (
                  <Badge variant="outline" className="bg-white/20 backdrop-blur border-white/30 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    360°
                  </Badge>
                )}
                {monastery.audio_guide_urls && Object.keys(monastery.audio_guide_urls).length > 0 && (
                  <Badge variant="outline" className="bg-white/20 backdrop-blur border-white/30 text-white">
                    <Headphones className="h-3 w-3 mr-1" />
                    Audio
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl">{monastery.name}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {monastery.location}
                </div>
                {monastery.founded_year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {monastery.founded_year}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{monastery.description}</p>

              {monastery.altitude && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Mountain className="h-4 w-4" />
                  <span>{monastery.altitude}m altitude</span>
                </div>
              )}

              <Button asChild className="w-full">
                <Link href={`/monasteries/${monastery.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMonasteries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No monasteries found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
