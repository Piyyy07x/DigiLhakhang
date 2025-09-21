"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ArrowLeft,
  MapPin,
  Calendar,
  Mountain,
  Globe,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import type { Monastery } from "@/lib/types"

interface AudioGuidePlayerProps {
  monastery: Monastery
}

const languageNames: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  ne: "Nepali",
  bo: "Tibetan",
  si: "Sikkimese",
}

const audioChapters = [
  { id: 1, title: "Introduction & History", duration: "3:45" },
  { id: 2, title: "Architecture & Design", duration: "4:20" },
  { id: 3, title: "Religious Significance", duration: "5:15" },
  { id: 4, title: "Daily Life & Rituals", duration: "3:30" },
  { id: 5, title: "Cultural Heritage", duration: "4:10" },
]

export function AudioGuidePlayer({ monastery }: AudioGuidePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(1260) // 21 minutes in seconds
  const [volume, setVolume] = useState([75])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [currentChapter, setCurrentChapter] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const availableLanguages = Object.keys(monastery.audio_guide_urls || {})

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const skipForward = () => {
    setCurrentTime(Math.min(currentTime + 15, duration))
  }

  const skipBackward = () => {
    setCurrentTime(Math.max(currentTime - 15, 0))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost">
          <Link href="/audio-guides">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Audio Guides
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Player */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={monastery.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={monastery.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-amber-600 text-white">
                    {monastery.tradition}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 backdrop-blur border-white/30 text-white">
                    <Globe className="h-3 w-3 mr-1" />
                    Audio Guide
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{monastery.name}</h1>
                <p className="text-gray-200">{monastery.location}</p>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Language Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Select Language:</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {languageNames[lang] || lang.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={skipBackward}>
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button onClick={togglePlayPause} size="lg" className="rounded-full w-16 h-16">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={skipForward}>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="sm" onClick={toggleMute}>
                  {isMuted || volume[0] === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1 max-w-32"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Monastery Info */}
          <Card>
            <CardHeader>
              <CardTitle>About This Monastery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{monastery.location}</span>
                </div>
                {monastery.founded_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Founded {monastery.founded_year}</span>
                  </div>
                )}
                {monastery.altitude && (
                  <div className="flex items-center gap-2">
                    <Mountain className="h-4 w-4 text-muted-foreground" />
                    <span>{monastery.altitude}m altitude</span>
                  </div>
                )}
              </div>

              {monastery.description && <p className="text-sm text-muted-foreground mt-4">{monastery.description}</p>}
            </CardContent>
          </Card>

          {/* Chapters */}
          <Card>
            <CardHeader>
              <CardTitle>Audio Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {audioChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentChapter === chapter.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentChapter(chapter.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{chapter.title}</span>
                      <span className="text-xs opacity-70">{chapter.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
