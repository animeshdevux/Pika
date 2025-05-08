"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface IconDownloadButtonProps {
  iconId: string
}

export function IconDownloadButton({ iconId }: IconDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (format: "svg" | "png") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/icons/${iconId}/download?format=${format}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Download failed")
      }

      // Create a temporary link to download the file
      const link = document.createElement("a")
      link.href = data.url
      link.download = `icon-${iconId}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Failed to download icon:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          <Download className="h-3 w-3 mr-1" />
          {isLoading ? "Downloading..." : "Download"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => handleDownload("svg")}>SVG</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload("png")}>PNG</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
