"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Info,
  ArrowLeft,
  MapPin,
  Calendar,
  Mountain,
} from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface VirtualTourViewerProps {
  monastery: Monastery
}

export function VirtualTourViewer({ monastery }: VirtualTourViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      {/* Virtual Tour Viewer */}
      <div ref={viewerRef} className="relative h-screen bg-black">
        {/* 360° Panoramic Viewer Placeholder */}
        <div className="relative w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-black flex items-center justify-center">
          <img
            src={monastery.images[0] || "/placeholder.svg?height=800&width=1200"}
            alt={`360° view of ${monastery.name}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay for 360° simulation */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Center indicator for 360° navigation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-white/50 rounded-full animate-pulse" />
          </div>

          {/* Navigation hotspots */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-amber-500 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform" />
          <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-amber-500 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform" />
          <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-amber-500 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform" />
        </div>

        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="text-white hover:bg-white/20"
              >
                <Info className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button asChild variant="ghost" className="text-white hover:bg-white/20">
            <Link href="/virtual-tours">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tours
            </Link>
          </Button>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="absolute top-20 right-6 w-80">
            <Card className="bg-black/80 backdrop-blur border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-amber-600 text-white">
                    {monastery.tradition}
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white">
                    360° Tour
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{monastery.name}</h3>

                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {monastery.location}
                  </div>
                  {monastery.founded_year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Founded {monastery.founded_year}
                    </div>
                  )}
                  {monastery.altitude && (
                    <div className="flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      {monastery.altitude}m altitude
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4">{monastery.description}</p>

                {monastery.significance && (
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="font-semibold text-white mb-2">Significance</h4>
                    <p className="text-gray-300 text-sm">{monastery.significance}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Tour Navigation */}
      <div className="bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Explore Different Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Main Hall", image: "/placeholder.svg?height=150&width=200" },
              { name: "Prayer Wheels", image: "/placeholder.svg?height=150&width=200" },
              { name: "Courtyard", image: "/placeholder.svg?height=150&width=200" },
              { name: "Buddha Statue", image: "/placeholder.svg?height=150&width=200" },
            ].map((area, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <CardContent className="p-3">
                  <img
                    src={area.image || "/placeholder.svg"}
                    alt={area.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <p className="text-white text-sm font-medium">{area.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
