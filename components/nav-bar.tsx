"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Pikaicons</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/pricing"
            className={`text-sm font-medium ${
              isActive("/pricing") ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
            } transition-colors`}
          >
            Pricing
          </Link>
          <Link
            href="/categories"
            className={`text-sm font-medium ${
              isActive("/categories") || pathname.startsWith("/categories/")
                ? "text-purple-600"
                : "text-gray-700 hover:text-purple-600"
            } transition-colors`}
          >
            Categories
          </Link>
          <Link
            href="/change-log"
            className={`text-sm font-medium ${
              isActive("/change-log") ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
            } transition-colors`}
          >
            Change-log
          </Link>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && <p className="font-medium">{session.user.name}</p>}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-gray-500">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(event) => {
                    event.preventDefault()
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/pricing" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link href="/categories" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                Categories
              </Link>
              <Link href="/change-log" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                Change-log
              </Link>
              {session ? (
                <>
                  {session.user.role === "ADMIN" && (
                    <Link href="/admin" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link href="/account" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                    Account Settings
                  </Link>
                  <button
                    className="text-base font-medium text-left"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                      setIsOpen(false)
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="text-base font-medium" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
