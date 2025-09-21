"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Mountain } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-amber-600" />
            <span className="font-bold text-xl font-mono tracking-normal text-chart-4 bg-[rgba(10,10,10,0)] border-background shadow-none">DigiLhakhang</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link href="/virtual-tours" className="text-foreground hover:text-amber-600 transition-colors">
              Virtual Tours
            </Link>
            <Link href="/audio-guides" className="text-foreground hover:text-amber-600 transition-colors">
              Audio Guides
            </Link>
            <Link href="/map" className="text-foreground hover:text-amber-600 transition-colors">
              Interactive Map
            </Link>
            <Link href="/monasteries" className="text-foreground hover:text-amber-600 transition-colors">
              All Monasteries
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/virtual-tours"
                className="block px-3 py-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Virtual Tours
              </Link>
              <Link
                href="/audio-guides"
                className="block px-3 py-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Audio Guides
              </Link>
              <Link
                href="/map"
                className="block px-3 py-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Interactive Map
              </Link>
              <Link
                href="/monasteries"
                className="block px-3 py-2 text-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                All Monasteries
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
