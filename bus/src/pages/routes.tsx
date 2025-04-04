"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Bus, Clock, MapPin, Search } from "lucide-react"
import "../styles/routes.css"

export default function RoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Routes data (would come from API in real app)
  const routes = [
    {
      id: 1,
      from: "Douala",
      to: "Yaoundé",
      distance: "243 km",
      duration: "3h 30m",
      price: "5,000 FCFA",
      frequency: "Every hour",
      region: "central",
      image: "/placeholder.svg?height=200&width=400&text=Douala-Yaoundé",
    },
    {
      id: 2,
      from: "Yaoundé",
      to: "Bamenda",
      distance: "366 km",
      duration: "5h 45m",
      price: "6,500 FCFA",
      frequency: "Every 2 hours",
      region: "northwest",
      image: "/placeholder.svg?height=200&width=400&text=Yaoundé-Bamenda",
    },
    {
      id: 3,
      from: "Douala",
      to: "Bafoussam",
      distance: "239 km",
      duration: "4h 00m",
      price: "4,000 FCFA",
      frequency: "Every 2 hours",
      region: "west",
      image: "/placeholder.svg?height=200&width=400&text=Douala-Bafoussam",
    },
    {
      id: 4,
      from: "Yaoundé",
      to: "Kribi",
      distance: "177 km",
      duration: "3h 15m",
      price: "3,500 FCFA",
      frequency: "Every 3 hours",
      region: "south",
      image: "/placeholder.svg?height=200&width=400&text=Yaoundé-Kribi",
    },
    {
      id: 5,
      from: "Douala",
      to: "Limbe",
      distance: "65 km",
      duration: "1h 30m",
      price: "2,500 FCFA",
      frequency: "Every hour",
      region: "southwest",
      image: "/placeholder.svg?height=200&width=400&text=Douala-Limbe",
    },
    {
      id: 6,
      from: "Bafoussam",
      to: "Bamenda",
      distance: "110 km",
      duration: "2h 30m",
      price: "3,000 FCFA",
      frequency: "Every 2 hours",
      region: "northwest",
      image: "/placeholder.svg?height=200&width=400&text=Bafoussam-Bamenda",
    },
    {
      id: 7,
      from: "Douala",
      to: "Buea",
      distance: "73 km",
      duration: "1h 45m",
      price: "2,500 FCFA",
      frequency: "Every hour",
      region: "southwest",
      image: "/placeholder.svg?height=200&width=400&text=Douala-Buea",
    },
    {
      id: 8,
      from: "Yaoundé",
      to: "Ebolowa",
      distance: "160 km",
      duration: "2h 45m",
      price: "3,000 FCFA",
      frequency: "Every 3 hours",
      region: "south",
      image: "/placeholder.svg?height=200&width=400&text=Yaoundé-Ebolowa",
    },
    {
      id: 9,
      from: "Douala",
      to: "Nkongsamba",
      distance: "140 km",
      duration: "2h 30m",
      price: "2,800 FCFA",
      frequency: "Every 2 hours",
      region: "littoral",
      image: "/placeholder.svg?height=200&width=400&text=Douala-Nkongsamba",
    },
  ]

  // Filter routes based on search query and selected region
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      searchQuery === "" ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRegion = selectedRegion === "all" || route.region === selectedRegion

    return matchesSearch && matchesRegion
  })

  return (
    <div className="routes-page">
      <div className="routes-hero">
        <div className="routes-hero-container">
          <div className="routes-hero-content">
            <h1 className="routes-hero-title">Bus Routes</h1>
            <p className="routes-hero-description">
              Explore our extensive network of bus routes connecting major cities across Cameroon
            </p>
          </div>
        </div>
      </div>

      <div className="routes-container">
        <div className="routes-search">
          <div className="routes-search-input-wrapper">
            <Search className="routes-search-icon" />
            <input
              type="text"
              placeholder="Search routes..."
              className="routes-search-input form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="routes-search-select">
            <select className="form-select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="all">All Regions</option>
              <option value="central">Central</option>
              <option value="littoral">Littoral</option>
              <option value="west">West</option>
              <option value="northwest">Northwest</option>
              <option value="southwest">Southwest</option>
              <option value="south">South</option>
            </select>
          </div>
        </div>

        <div className="routes-grid">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="route-card card">
              <div className="route-image-container">
                <img
                  src={route.image || "/placeholder.svg"}
                  alt={`${route.from} to ${route.to}`}
                  className="route-image"
                />
              </div>
              <div className="route-content">
                <div className="route-header">
                  <div className="route-cities">
                    <div className="route-city">{route.from}</div>
                    <div className="route-line"></div>
                    <div className="route-city">{route.to}</div>
                  </div>
                </div>

                <div className="route-details">
                  <div className="route-detail">
                    <MapPin className="route-detail-icon" />
                    {route.distance}
                  </div>
                  <div className="route-detail">
                    <Clock className="route-detail-icon" />
                    {route.duration}
                  </div>
                  <div className="route-detail">
                    <Bus className="route-detail-icon" />
                    {route.frequency}
                  </div>
                  <div className="route-price">{route.price}</div>
                </div>

                <Link to={`/search?from=${route.from}&to=${route.to}`} className="route-link">
                  <button className="route-button btn btn-primary">View Schedule</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="routes-empty">
            <div className="routes-empty-icon-container">
              <Search className="routes-empty-icon" />
            </div>
            <h3 className="routes-empty-title">No routes found</h3>
            <p className="routes-empty-description">
              No routes match your search criteria. Try adjusting your filters.
            </p>
            <button
              className="routes-empty-button btn btn-primary"
              onClick={() => {
                setSearchQuery("")
                setSelectedRegion("all")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

