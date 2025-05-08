"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
}

export function IconUpload() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [svgFile, setSvgFile] = useState<File | null>(null)
  const [pngFile, setPngFile] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (!svgFile) {
      setError("SVG file is required")
      setIsLoading(false)
      return
    }

    if (!categoryId) {
      setError("Category is required")
      setIsLoading(false)
      return
    }

    try {
      // Upload SVG file
      const svgFormData = new FormData()
      svgFormData.append("file", svgFile)
      svgFormData.append("type", "svg")

      const svgResponse = await fetch("/api/upload", {
        method: "POST",
        body: svgFormData,
      })

      if (!svgResponse.ok) {
        throw new Error("Failed to upload SVG file")
      }

      const svgData = await svgResponse.json()
      const svgUrl = svgData.url

      // Upload PNG file if provided
      let pngUrl = null
      if (pngFile) {
        const pngFormData = new FormData()
        pngFormData.append("file", pngFile)
        pngFormData.append("type", "png")

        const pngResponse = await fetch("/api/upload", {
          method: "POST",
          body: pngFormData,
        })

        if (!pngResponse.ok) {
          throw new Error("Failed to upload PNG file")
        }

        const pngData = await pngResponse.json()
        pngUrl = pngData.url
      }

      // Create icon
      const iconResponse = await fetch("/api/icons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          svgUrl,
          pngUrl,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          categoryId,
        }),
      })

      if (!iconResponse.ok) {
        throw new Error("Failed to create icon")
      }

      setSuccess("Icon uploaded successfully!")
      setName("")
      setDescription("")
      setTags("")
      setCategoryId("")
      setSvgFile(null)
      setPngFile(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Icon</CardTitle>
        <CardDescription>Upload SVG and optionally PNG versions of your icon</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Icon Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. ui, interface, button"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="svg-file">SVG File (Required)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="svg-file"
                  type="file"
                  accept=".svg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSvgFile(e.target.files[0])
                    }
                  }}
                  className="hidden"
                />
                <div className="flex-1 border rounded-md p-2 flex items-center justify-between">
                  <span className="truncate">{svgFile ? svgFile.name : "No file selected"}</span>
                  {svgFile ? (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setSvgFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Label htmlFor="svg-file" className="cursor-pointer">
                      <Button type="button" variant="ghost" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="png-file">PNG File (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="png-file"
                  type="file"
                  accept=".png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPngFile(e.target.files[0])
                    }
                  }}
                  className="hidden"
                />
                <div className="flex-1 border rounded-md p-2 flex items-center justify-between">
                  <span className="truncate">{pngFile ? pngFile.name : "No file selected"}</span>
                  {pngFile ? (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setPngFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Label htmlFor="png-file" className="cursor-pointer">
                      <Button type="button" variant="ghost" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </Label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Icon"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
