import { db } from "@/lib/db"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    include: {
      icons: {
        take: 6,
        select: {
          id: true,
          name: true,
          svgUrl: true,
        },
      },
      _count: {
        select: {
          icons: true,
        },
      },
    },
  })

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Icon Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our extensive collection of icons organized by category.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>
                {category.description || `A collection of ${category._count.icons} icons`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {category.icons.map((icon) => (
                  <div
                    key={icon.id}
                    className="aspect-square flex items-center justify-center p-2 bg-gray-50 rounded-md hover:bg-purple-50 transition-colors"
                  >
                    <img src={icon.svgUrl || "/placeholder.svg"} alt={icon.name} className="w-6 h-6" />
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 6 - category.icons.length) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-square flex items-center justify-center p-2 bg-gray-50 rounded-md"
                  />
                ))}
              </div>
              <Link href={`/categories/${category.slug}`}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">View All ({category._count.icons})</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
