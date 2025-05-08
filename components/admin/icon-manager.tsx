"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Eye, Trash } from "lucide-react"

type Icon = {
  id: string
  name: string
  svgUrl: string
  pngUrl: string | null
  category: {
    id: string
    name: string
  }
}

type Category = {
  id: string
  name: string
  slug: string
}

export function IconManager() {
  const [icons, setIcons] = useState<Icon[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchIcons = async () => {
    setIsLoading(true)
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
      console.error("Failed to fetch icons:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchIcons()
  }, [])

  useEffect(() => {
    fetchIcons()
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Manage Icons</CardTitle>
          <CardDescription>View, edit, and delete icons in your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading icons...
                  </TableCell>
                </TableRow>
              ) : icons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No icons found
                  </TableCell>
                </TableRow>
              ) : (
                icons.map((icon) => (
                  <TableRow key={icon.id}>
                    <TableCell>
                      <div className="w-10 h-10 bg-gray-50 rounded-md flex items-center justify-center">
                        <img src={icon.svgUrl || "/placeholder.svg"} alt={icon.name} className="w-6 h-6" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{icon.name}</TableCell>
                    <TableCell>{icon.category.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
