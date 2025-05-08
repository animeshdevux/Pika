"use client"

import { useMemo } from "react"
import { IconComponent } from "@/components/icon-component"

export function IconGrid() {
  // Generate a grid of icons
  const icons = useMemo(() => {
    const iconTypes = [
      "mail",
      "user",
      "settings",
      "home",
      "calendar",
      "file",
      "folder",
      "image",
      "camera",
      "video",
      "music",
      "heart",
      "star",
      "bookmark",
      "bell",
      "message",
      "phone",
      "search",
      "lock",
      "key",
      "cloud",
      "download",
      "upload",
      "trash",
      "edit",
      "eye",
      "globe",
      "map",
      "chart",
      "graph",
      "dollar",
      "credit-card",
      "gift",
      "tag",
      "link",
      "share",
      "wifi",
      "bluetooth",
      "battery",
      "power",
      "sun",
      "moon",
    ]

    // Create a grid of 20x20 icons
    const grid = []
    for (let i = 0; i < 20; i++) {
      const row = []
      for (let j = 0; j < 20; j++) {
        const randomIcon = iconTypes[Math.floor(Math.random() * iconTypes.length)]
        row.push(randomIcon)
      }
      grid.push(row)
    }

    return grid
  }, [])

  return (
    <div className="grid grid-cols-20 gap-4 p-4">
      {icons.map((row, rowIndex) =>
        row.map((icon, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="flex items-center justify-center">
            <IconComponent type={icon} className="w-6 h-6 text-purple-300" />
          </div>
        )),
      )}
    </div>
  )
}
