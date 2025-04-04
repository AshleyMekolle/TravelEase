"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import "../styles/mode-toggle.css"

export function ModeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button onClick={toggleTheme} className="mode-toggle-button" aria-label="Toggle theme">
      <Sun className="mode-toggle-icon mode-toggle-sun" />
      <Moon className="mode-toggle-icon mode-toggle-moon" />
    </button>
  )
}

