export interface Monastery {
  id: string
  name: string
  description: string | null
  location: string
  latitude: number | null
  longitude: number | null
  altitude: number | null
  founded_year: number | null
  tradition: string | null
  main_deity: string | null
  significance: string | null
  visiting_hours: string | null
  entry_fee: string | null
  contact_info: any
  images: string[]
  virtual_tour_url: string | null
  audio_guide_urls: Record<string, string>
  created_at: string
  updated_at: string
}

export interface AudioGuide {
  language: string
  url: string
  title: string
}

export interface VirtualTour {
  id: string
  monastery_id: string
  title: string
  description: string
  tour_url: string
  thumbnail: string
}
