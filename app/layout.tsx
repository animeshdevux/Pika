import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NavBar } from "@/components/nav-bar"
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pikaicons - High-Quality Icon for Modern UI Design",
  description:
    "A modern icon library built on Figma offers a growing collection of charming, customizable SVG icons for UI/UX and digital product design.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <NavBar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
