"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconDownloadButton } from "@/components/icon-download-button"
import { SearchIcon } from "lucide-react"

type Icon = {
  id: string
  name: string
  svgUrl: string
  category: {
    id: string
    name: string
    slug: string
  }
}

type Category = {
  id: string
  name: string
  slug: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [icons, setIcons] = useState<Icon[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = async () => {
    setIsLoading(true)
    setHasSearched(true)

    try {
      let url = "/api/icons"
      const params = new URLSearchParams()

      if (selectedCategory) {
        params.append("categoryId", selectedCategory)
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setIcons(data)
    } catch (error) {
      console.error("Failed to search icons:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Search Icons</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect icon for your project</p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Searching for icons...</p>
        </div>
      ) : hasSearched ? (
        <>
          {icons.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No icons found. Try a different search term or category.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term or select a category to find icons.</p>
        </div>
      )}
    </div>
  )
}
