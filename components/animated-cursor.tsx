"use client"
import React from "react"

export function AnimatedCursor() {
  React.useEffect(() => {
    const cursor = document.createElement("div")
    cursor.style.position = "fixed"
    cursor.style.zIndex = "9999"
    cursor.style.pointerEvents = "none"
    cursor.style.width = "32px"
    cursor.style.height = "32px"
    cursor.style.borderRadius = "50%"
    cursor.style.background = "radial-gradient(circle at 30% 30%, #a78bfa 60%, transparent 100%)"
    cursor.style.boxShadow = "0 0 24px 8px #a78bfa55"
    cursor.style.transition = "transform 0.1s cubic-bezier(.4,2,.6,1), opacity 0.2s"
    cursor.style.opacity = "0.7"
    document.body.appendChild(cursor)
    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
    }
    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      document.body.removeChild(cursor)
    }
  }, [])
  return null
} 