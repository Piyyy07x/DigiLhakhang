"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, NavigationIcon, Search, Filter, Calendar, Mountain, Route, Eye, Headphones, X } from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface InteractiveMapProps {
  monasteries: Monastery[]
}

export function InteractiveMap({ monasteries }: InteractiveMapProps) {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [traditionFilter, setTraditionFilter] = useState("all")
  const [filteredMonasteries, setFilteredMonasteries] = useState(monasteries)

  // Get unique traditions for filter
  const traditions = Array.from(new Set(monasteries.map((m) => m.tradition).filter(Boolean)))

  // Filter monasteries based on search and tradition
  useEffect(() => {
    let filtered = monasteries

    if (searchTerm) {
      filtered = filtered.filter(
        (monastery) =>
          monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          monastery.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (traditionFilter !== "all") {
      filtered = filtered.filter((monastery) => monastery.tradition === traditionFilter)
    }

    setFilteredMonasteries(filtered)
  }, [searchTerm, traditionFilter, monasteries])

  const handleMonasteryClick = (monastery: Monastery) => {
    setSelectedMonastery(monastery)
  }

  const closeDetails = () => {
    setSelectedMonastery(null)
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 bg-background border-r border-border overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Interactive Map</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Explore geo-tagged monasteries across Sikkim with detailed location information and route guidance.
          </p>

          {/* Search and Filter */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search monasteries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={traditionFilter} onValueChange={setTraditionFilter}>
              <SelectTrigger>
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

          {/* Monasteries List */}
          <div className="space-y-3">
            {filteredMonasteries.map((monastery) => (
              <Card
                key={monastery.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMonastery?.id === monastery.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleMonasteryClick(monastery)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={monastery.images[0] || "/placeholder.svg?height=48&width=48"}
                        alt={monastery.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{monastery.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{monastery.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {monastery.tradition}
                        </Badge>
                        {monastery.altitude && (
                          <span className="text-xs text-muted-foreground">{monastery.altitude}m</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Simulated Map */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-gray-100 relative overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Monastery Markers */}
          {filteredMonasteries.map((monastery, index) => {
            // Simulate positions based on actual coordinates
            const x = ((monastery.longitude || 88.5) - 88.0) * 800 + 200
            const y = (28.0 - (monastery.latitude || 27.5)) * 600 + 100

            return (
              <div
                key={monastery.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                  selectedMonastery?.id === monastery.id ? "scale-125 z-10" : "z-0"
                }`}
                style={{
                  left: `${Math.max(50, Math.min(x, window.innerWidth - 100))}px`,
                  top: `${Math.max(50, Math.min(y, 500))}px`,
                }}
                onClick={() => handleMonasteryClick(monastery)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    selectedMonastery?.id === monastery.id
                      ? "bg-amber-600 text-white"
                      : "bg-white text-amber-600 border-2 border-amber-600"
                  }`}
                >
                  <Mountain className="h-4 w-4" />
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium">{monastery.name}</div>
                </div>
              </div>
            )
          })}

          {/* Map Legend */}
          <div className="absolute top-4 right-4">
            <Card className="bg-white/90 backdrop-blur">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-3">Map Legend</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                    <span>Selected Monastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-amber-600 rounded-full"></div>
                    <span>Available Monasteries</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
              +
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
              -
            </Button>
          </div>
        </div>

        {/* Monastery Details Panel */}
        {selectedMonastery && (
          <div className="absolute top-4 left-4 w-80">
            <Card className="bg-white/95 backdrop-blur shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMonastery.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-amber-600 text-white text-xs">
                        {selectedMonastery.tradition}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeDetails}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="h-32 rounded-lg overflow-hidden">
                  <img
                    src={selectedMonastery.images[0] || "/placeholder.svg?height=128&width=320"}
                    alt={selectedMonastery.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedMonastery.location}</span>
                  </div>
                  {selectedMonastery.founded_year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded {selectedMonastery.founded_year}</span>
                    </div>
                  )}
                  {selectedMonastery.altitude && (
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedMonastery.altitude}m altitude</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">{selectedMonastery.description}</p>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/monasteries/${selectedMonastery.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Link>
                  </Button>
                  {selectedMonastery.virtual_tour_url && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/virtual-tours/${selectedMonastery.id}`}>
                        <NavigationIcon className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                  {selectedMonastery.audio_guide_urls && Object.keys(selectedMonastery.audio_guide_urls).length > 0 && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/audio-guides/${selectedMonastery.id}`}>
                        <Headphones className="h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Route Information */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Route className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Getting There</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Nearest town: {selectedMonastery.location}</p>
                    <p>
                      • Coordinates: {selectedMonastery.latitude?.toFixed(4)}, {selectedMonastery.longitude?.toFixed(4)}
                    </p>
                    {selectedMonastery.visiting_hours && <p>• Hours: {selectedMonastery.visiting_hours}</p>}
                    {selectedMonastery.entry_fee && <p>• Entry: {selectedMonastery.entry_fee}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
