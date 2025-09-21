"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  Mountain,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Play,
  Headphones,
  Map,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
} from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface MonasteryDetailsProps {
  monastery: Monastery
}

export function MonasteryDetails({ monastery }: MonasteryDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const images = monastery.images || []
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const availableLanguages = Object.keys(monastery.audio_guide_urls || {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost">
          <Link href="/monasteries">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Monasteries
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
              <img
                src={images[currentImageIndex] || "/placeholder.svg?height=500&width=800"}
                alt={`${monastery.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {hasMultipleImages && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Tradition Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-amber-600 text-white">
                  {monastery.tradition}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Monastery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{monastery.name}</CardTitle>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {monastery.location}
                </div>
                {monastery.founded_year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Founded {monastery.founded_year}
                  </div>
                )}
                {monastery.altitude && (
                  <div className="flex items-center gap-1">
                    <Mountain className="h-4 w-4" />
                    {monastery.altitude}m
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {monastery.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{monastery.description}</p>
                </div>
              )}

              {monastery.significance && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Significance</h3>
                  <p className="text-muted-foreground leading-relaxed">{monastery.significance}</p>
                </div>
              )}

              {monastery.main_deity && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Main Deity</h3>
                  <p className="text-muted-foreground">{monastery.main_deity}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monastery.virtual_tour_url && (
              <Button asChild size="lg" className="h-16">
                <Link href={`/virtual-tours/${monastery.id}`}>
                  <Play className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Virtual Tour</div>
                    <div className="text-xs opacity-80">360° Experience</div>
                  </div>
                </Link>
              </Button>
            )}

            {availableLanguages.length > 0 && (
              <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
                <Link href={`/audio-guides/${monastery.id}`}>
                  <Headphones className="mr-2 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Audio Guide</div>
                    <div className="text-xs opacity-80">{availableLanguages.length} Languages</div>
                  </div>
                </Link>
              </Button>
            )}

            <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
              <Link href="/map">
                <Map className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">View on Map</div>
                  <div className="text-xs opacity-80">Location & Routes</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Visiting Information */}
          <Card>
            <CardHeader>
              <CardTitle>Visiting Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monastery.visiting_hours && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Opening Hours</div>
                    <div className="text-sm text-muted-foreground">{monastery.visiting_hours}</div>
                  </div>
                </div>
              )}

              {monastery.entry_fee && (
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Entry Fee</div>
                    <div className="text-sm text-muted-foreground">{monastery.entry_fee}</div>
                  </div>
                </div>
              )}

              {monastery.contact_info && (
                <div>
                  <Separator className="my-4" />
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    {monastery.contact_info.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{monastery.contact_info.phone}</span>
                      </div>
                    )}
                    {monastery.contact_info.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{monastery.contact_info.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location Details */}
          {(monastery.latitude || monastery.longitude) && (
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latitude:</span>
                    <span>{monastery.latitude?.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longitude:</span>
                    <span>{monastery.longitude?.toFixed(6)}</span>
                  </div>
                  {monastery.altitude && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Altitude:</span>
                      <span>{monastery.altitude}m</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tradition Information */}
          <Card>
            <CardHeader>
              <CardTitle>Buddhist Tradition</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="mb-3">
                {monastery.tradition}
              </Badge>
              <p className="text-sm text-muted-foreground">
                This monastery follows the {monastery.tradition} tradition of Tibetan Buddhism, one of the major schools
                of Buddhist practice in the Himalayan region.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
