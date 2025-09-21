import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "DigiLhakhang - Digital Heritage of Sikkim's Sacred Monasteries",
  description:
    "Explore Sikkim's ancient monasteries through immersive virtual tours, multilingual audio guides, and interactive maps. Discover the spiritual heritage of the Himalayas.",
  generator: "v0.app",
  keywords: "Sikkim monasteries, Buddhist heritage, virtual tours, Himalayan culture, spiritual tourism",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
