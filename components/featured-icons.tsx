import { IconDownloadButton } from "@/components/icon-download-button"

type Icon = {
  id: string
  name: string
  svgUrl: string
  category: {
    name: string
    slug: string
  }
}

interface FeaturedIconsProps {
  icons: Icon[]
}

export function FeaturedIcons({ icons }: FeaturedIconsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {icons.map((icon) => (
        <div key={icon.id} className="group relative">
          <div className="aspect-square flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
            <img src={icon.svgUrl || "/placeholder.svg"} alt={icon.name} className="w-8 h-8" />
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium truncate">{icon.name}</p>
            <p className="text-xs text-gray-500 truncate">{icon.category.name}</p>
            <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconDownloadButton iconId={icon.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
