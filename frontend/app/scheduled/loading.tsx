"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
      <p className="mt-4 text-muted-foreground animate-pulse-slow">Loading{dots}</p>
    </div>
  )
}

