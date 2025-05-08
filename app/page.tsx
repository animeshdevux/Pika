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

  // Placeholder categories
  const categories = [
    "Interface", "E-commerce", "Finance", "Media", "Communication", "Productivity", "Health", "Travel", "Weather", "Social", "Files", "Security", "Charts", "Maps", "Arrows", "Users", "Devices", "Settings", "Food", "Nature"
  ];

  // Placeholder testimonials
  const testimonials = [
    {
      name: "F. Designer",
      text: "The sheer breadth of this icon set is impressive. I appreciate the pixel-perfect detail and the ease of use!",
    },
    {
      name: "Sarah A.",
      text: "Crafted for design systems. Pikaicons is my go-to for every new project!",
    },
    {
      name: "James Young",
      text: "Pikaicons is the ideal choice for modern, beautiful, and consistent icons. Highly recommended!",
    },
    {
      name: "Maddy P.",
      text: "Rich icon library, smooth integration, and amazing support. My favorite icon set!",
    },
    {
      name: "John S.",
      text: "Pikaicons is the best! All my projects look more professional and polished now.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Background Icon Grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none select-none">
        <IconGrid />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
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

        {/* Icon Styles Section */}
        <section className="container mx-auto py-16 text-center">
          <h3 className="text-2xl font-bold mb-2">5 icon styles to match any design vision</h3>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Switch between stroke, solid, duotone, and more. Every icon is crafted for clarity and consistency at any size.</p>
          {/* Placeholder for tabbed icon styles */}
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="outline">Stroke</Button>
            <Button variant="outline">Solid</Button>
            <Button variant="outline">Colored</Button>
            <Button variant="outline">Duo Stroke</Button>
            <Button variant="outline">Duo Solid</Button>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="grid grid-cols-8 gap-4">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                    <img src="/placeholder.svg" alt="icon" className="w-8 h-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">Elevate your UI with 4000+ precision icons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <img src="/placeholder.svg" alt="feature" className="w-16 h-16 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Pixel Perfect</h4>
                <p className="text-gray-500 text-sm text-center">Every icon is designed on a precise grid for crisp rendering at any size.</p>
              </div>
            ))}
          </div>
        </section>

        {/* UI Mockup Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">Bring your UI to life with Pikaicons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                <img src="/placeholder.svg" alt="ui mockup" className="w-32 h-24 mb-4" />
                <p className="text-gray-500 text-sm text-center">UI Example {n}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Crafted with Expertise Section */}
        <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Crafted with expertise</h3>
          <div className="flex flex-col items-center justify-center">
            <img src="/placeholder.svg" alt="crafted" className="w-48 h-48 mb-6" />
            <p className="max-w-xl mx-auto text-gray-300">Each icon is meticulously designed with pixel-perfect precision, ensuring clarity and consistency across your projects.</p>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">Icons that grow with your ideas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col items-center">
                <img src="/placeholder.svg" alt="feature" className="w-12 h-12 mb-4" />
                <h4 className="font-semibold mb-2">Feature {n}</h4>
                <p className="text-gray-500 text-sm">Flexible, scalable, and always up to date. Use icons in any project, any platform.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">Explore icon categories for every use case</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <span key={cat} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-100 transition">{cat}</span>
            ))}
          </div>
        </section>

        {/* Pricing/Updates Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">Pay Once, Get Icons for life – Plus free updates!</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <img src="/placeholder.svg" alt="pricing" className="w-16 h-16 mb-4" />
                <h4 className="font-semibold text-lg mb-2">Pricing Option {n}</h4>
                <p className="text-gray-500 text-sm text-center">One-time payment, unlimited access, and free updates forever.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto py-16">
          <h3 className="text-2xl font-bold text-center mb-8">The icon library designers recommend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                <img src="/placeholder-user.jpg" alt={t.name} className="w-12 h-12 rounded-full mb-4" />
                <p className="text-gray-700 text-base mb-2">"{t.text}"</p>
                <span className="text-gray-500 text-sm font-medium">{t.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="w-full py-10 bg-gray-50 border-t mt-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/placeholder-logo.svg" alt="Pikaicons Logo" className="w-6 h-6" />
              <span className="font-bold text-lg">Pikaicons</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
              <Link href="/pricing">Pricing</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/change-log">Change-log</Link>
              <Link href="/login">Login</Link>
            </div>
            <div className="text-gray-400 text-xs">© {new Date().getFullYear()} Pikaicons. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </main>
  )
}