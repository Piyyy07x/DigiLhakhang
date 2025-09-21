"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, Calendar, Eye } from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface VirtualToursGridProps {
  monasteries: Monastery[]
}

export function VirtualToursGrid({ monasteries }: VirtualToursGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {monasteries.map((monastery) => (
        <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img
              src={monastery.images[0] || "/placeholder.svg?height=300&width=400"}
              alt={monastery.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur rounded-full p-4 group-hover:bg-white/30 transition-colors duration-300">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Tradition Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-amber-600 text-white">
                {monastery.tradition}
              </Badge>
            </div>

            {/* 360° Indicator */}
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-white/20 backdrop-blur border-white/30 text-white">
                <Eye className="h-3 w-3 mr-1" />
                360°
              </Badge>
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

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href={`/virtual-tours/${monastery.id}`}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Virtual Tour
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href={`/monasteries/${monastery.id}`}>Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
