import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { IconDownloadButton } from "@/components/icon-download-button"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  const category = await db.category.findUnique({
    where: {
      slug,
    },
    include: {
      icons: true,
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && <p className="text-gray-600 max-w-3xl">{category.description}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {category.icons.map((icon) => (
          <div key={icon.id} className="group relative">
            <div className="aspect-square flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
              <img src={icon.svgUrl || "/placeholder.svg"} alt={icon.name} className="w-8 h-8" />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium truncate">{icon.name}</p>
              <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconDownloadButton iconId={icon.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {category.icons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No icons found in this category.</p>
        </div>
      )}
    </div>
  )
}
