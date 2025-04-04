"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Bus, Menu, X, Home, Search, CreditCard, Phone, User, LogIn } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import "../styles/header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("travelease-user")
    setIsLoggedIn(!!user)

    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("travelease-user")
    setIsLoggedIn(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <Bus className="header-logo-icon" />
          <span className="header-logo-text">TravelEase</span>
        </Link>

        <nav className="header-nav">
          <Link to="/" className={`header-nav-link ${location.pathname === "/" ? "header-nav-link-active" : ""}`}>
            Home
          </Link>
          <Link
            to="/search"
            className={`header-nav-link ${location.pathname === "/search" ? "header-nav-link-active" : ""}`}
          >
            Find Buses
          </Link>
          <Link
            to="/routes"
            className={`header-nav-link ${location.pathname === "/routes" ? "header-nav-link-active" : ""}`}
          >
            Routes
          </Link>
          {isLoggedIn && (
            <Link
              to="/bookings"
              className={`header-nav-link ${location.pathname === "/bookings" ? "header-nav-link-active" : ""}`}
            >
              My Bookings
            </Link>
          )}
          <Link
            to="/contact"
            className={`header-nav-link ${location.pathname === "/contact" ? "header-nav-link-active" : ""}`}
          >
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header-profile-btn btn btn-outline btn-sm">
                <User className="header-action-icon" />
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="header-auth-btn btn btn-primary btn-sm">
                <LogIn className="header-action-icon" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="header-auth-btn btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/auth/signup" className="header-auth-btn btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}

          <button className="header-mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu className="header-menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`header-mobile-menu ${isMenuOpen ? "header-mobile-menu-open" : ""}`}>
        <div className="header-mobile-menu-header">
          <Link to="/" className="header-logo">
            <Bus className="header-logo-icon" />
            <span className="header-logo-text">TravelEase</span>
          </Link>
          <button className="header-mobile-close-button" onClick={toggleMenu} aria-label="Close menu">
            <X className="header-menu-icon" />
          </button>
        </div>

        <nav className="header-mobile-nav">
          <Link to="/" className="header-mobile-nav-item">
            <Home className="header-mobile-nav-icon" />
            Home
          </Link>
          <Link to="/search" className="header-mobile-nav-item">
            <Search className="header-mobile-nav-icon" />
            Find Buses
          </Link>
          <Link to="/routes" className="header-mobile-nav-item">
            <Bus className="header-mobile-nav-icon" />
            Routes
          </Link>
          {isLoggedIn && (
            <Link to="/bookings" className="header-mobile-nav-item">
              <CreditCard className="header-mobile-nav-icon" />
              My Bookings
            </Link>
          )}
          <Link to="/contact" className="header-mobile-nav-item">
            <Phone className="header-mobile-nav-icon" />
            Contact
          </Link>
        </nav>

        <div className="header-mobile-actions">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header-mobile-action-button btn btn-outline">
                <User className="header-mobile-action-icon" />
                Profile
              </Link>
              <button onClick={handleLogout} className="header-mobile-action-button btn btn-primary">
                <LogIn className="header-mobile-action-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="header-mobile-action-button btn btn-outline">
                Sign In
              </Link>
              <Link to="/auth/signup" className="header-mobile-action-button btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

