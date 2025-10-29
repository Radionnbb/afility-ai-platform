"use client"

import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import { useEffect } from "react"

interface ClientLayoutProps {
  children: React.ReactNode
  inter: { className: string }
}

export default function ClientLayout({ children, inter }: ClientLayoutProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((error) => {
        console.warn("[v0] Service Worker registration failed:", error)
      })
    }
  }, [])

  return (
    <div className={`${inter.className} dark`}>
      <div className="min-h-screen bg-black">
        <Navigation />
        <main>{children}</main>
        <Toaster />
      </div>
    </div>
  )
}
