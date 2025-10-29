"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/search" },
  { name: "Profile", href: "/profile" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SaveAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden",
                  pathname === item.href
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50",
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 animate-pulse"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/5 group-hover:to-blue-600/5 transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/60 border border-transparent hover:border-gray-700/50 transition-all duration-300 rounded-lg px-4 py-2"
              asChild
            >
              <Link href="/signin" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 rounded-lg px-6 py-2 border border-blue-500/30 hover:border-blue-400/50"
              asChild
            >
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <span className="text-xl">☰</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-black/95 backdrop-blur-xl border-gray-800/50 shadow-2xl"
            >
              <div className="flex flex-col space-y-6 mt-8">
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg border",
                        pathname === item.href
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 shadow-lg shadow-blue-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50 border-transparent hover:border-gray-700/50",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-800/50">
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-300 hover:text-white hover:bg-gray-800/60 border border-transparent hover:border-gray-700/50 rounded-lg h-12"
                    asChild
                  >
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    className="justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-lg h-12"
                    asChild
                  >
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
