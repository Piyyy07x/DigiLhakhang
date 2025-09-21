import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Mountain } from "lucide-react"
import Link from "next/link"

const featuredMonasteries = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "East Sikkim",
    tradition: "Kagyu",
    foundedYear: 1966,
    description: "The largest monastery in Sikkim and seat-in-exile of the Gyalwang Karmapa.",
    image: "/rumtek-monastery-with-golden-roofs-and-prayer-flag.jpg",
    significance: "Seat of Karmapa",
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    tradition: "Nyingma",
    foundedYear: 1705,
    description: "One of the oldest and premier monasteries of Sikkim, head monastery of Nyingma order.",
    image: "/ancient-pemayangtse-monastery-on-hilltop-with-moun.jpg",
    significance: "Premier Nyingma Monastery",
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "Gangtok",
    tradition: "Nyingma",
    foundedYear: 1909,
    description: "Located on a hilltop above Gangtok, famous for its annual Cham dance festival.",
    image: "/enchey-monastery-with-traditional-architecture-and.jpg",
    significance: "Cham Dance Festival",
  },
]

export function FeaturedMonasteries() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Sacred Sites</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore the most significant monasteries that have shaped Sikkim's spiritual landscape for centuries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMonasteries.map((monastery) => (
            <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={monastery.image || "/placeholder.svg"}
                  alt={monastery.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-amber-600 text-white">
                    {monastery.tradition}
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
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {monastery.foundedYear}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">{monastery.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Mountain className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-600">{monastery.significance}</span>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/monasteries/${monastery.id}`}>Explore Monastery</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/monasteries">View All Monasteries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
