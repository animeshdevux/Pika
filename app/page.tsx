import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconGrid } from "@/components/icon-grid"
import { TrustedBy } from "@/components/trusted-by"
import { db } from "@/lib/db"
import { FeaturedIcons } from "@/components/featured-icons"

export default async function Home() {
  // Get featured icons from the database
  const featuredIcons = await db.icon.findMany({
    take: 12,
    include: {
      category: true,
    },
  })

  return (
    <main className="min-h-screen bg-white">
      {/* Background Icon Grid */}
      <div className="fixed inset-0 z-0 opacity-10">
        <IconGrid />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Pikaicons</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-purple-600 transition-colors">
              Categories
            </Link>
            <Link href="/change-log" className="text-gray-700 hover:text-purple-600 transition-colors">
              Change-log
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-purple-600 transition-colors">
              Login
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto py-20 text-center max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">High-Quality Icon for Modern UI Design</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            A modern icon library built on Figma offers a growing collection of charming, customizable SVG icons for
            UI/UX and digital product design. Our lightweight, fully optimized icon pack is perfect for designers who
            value beautiful, consistent, and minimalist icons.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                <path d="M12 16h3.5a3.5 3.5 0 1 1 0 7H12v-7z" />
              </svg>
              View in Figma
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Download</Button>
          </div>
        </section>

        {/* Featured Icons Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-12">Featured Icons</h3>
          <FeaturedIcons icons={featuredIcons} />
          <div className="text-center mt-8">
            <Link href="/categories">
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                View All Categories
              </Button>
            </Link>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="container mx-auto py-10 text-center">
          <p className="text-gray-500 mb-8">Trusted by 10,000+ designers and brands worldwide</p>
          <TrustedBy />
        </section>
      </div>
    </main>
  )
}
