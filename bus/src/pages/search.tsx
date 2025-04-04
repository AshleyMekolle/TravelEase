"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Bus,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Search,
  Wifi,
  Coffee,
  Tv,
  Usb,
  Users,
} from "lucide-react"
import "../styles/search.css"

export default function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filteredBuses, setFilteredBuses] = useState([])
  const [searchData, setSearchData] = useState({
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    date: searchParams.get("date") || new Date().toISOString().split("T")[0],
    passengers: searchParams.get("passengers") || "1",
  })

  // Filter states
  const [priceRange, setPriceRange] = useState(10000)
  const [departureFilters, setDepartureFilters] = useState({
    morning: true,
    afternoon: true,
    evening: false,
  })
  const [companyFilters, setCompanyFilters] = useState({
    "Express Travel": true,
    "Comfort Line": true,
    "Royal Tours": true,
    "City Link": true,
  })
  const [amenityFilters, setAmenityFilters] = useState({
    wifi: true,
    ac: true,
    usb: false,
    tv: false,
  })
  const [sortBy, setSortBy] = useState("price")

  // Mock data for bus results
  const allBuses = [
    {
      id: 1,
      company: "Express Travel",
      from: "douala",
      to: "yaounde",
      departureTime: "08:00",
      arrivalTime: "11:30",
      duration: "3h 30m",
      price: 5000,
      availableSeats: 23,
      amenities: ["wifi", "ac", "usb", "tv"],
      departureCategory: "morning",
    },
    {
      id: 2,
      company: "Comfort Line",
      from: "douala",
      to: "yaounde",
      departureTime: "09:30",
      arrivalTime: "13:00",
      duration: "3h 30m",
      price: 6000,
      availableSeats: 15,
      amenities: ["wifi", "ac", "usb"],
      departureCategory: "morning",
    },
    {
      id: 3,
      company: "Royal Tours",
      from: "douala",
      to: "yaounde",
      departureTime: "10:45",
      arrivalTime: "14:15",
      duration: "3h 30m",
      price: 5500,
      availableSeats: 8,
      amenities: ["wifi", "ac", "tv"],
      departureCategory: "morning",
    },
    {
      id: 4,
      company: "City Link",
      from: "douala",
      to: "yaounde",
      departureTime: "12:00",
      arrivalTime: "15:30",
      duration: "3h 30m",
      price: 4800,
      availableSeats: 30,
      amenities: ["ac"],
      departureCategory: "afternoon",
    },
    {
      id: 5,
      company: "Express Travel",
      from: "douala",
      to: "yaounde",
      departureTime: "14:30",
      arrivalTime: "18:00",
      duration: "3h 30m",
      price: 5200,
      availableSeats: 18,
      amenities: ["wifi", "ac", "usb"],
      departureCategory: "afternoon",
    },
    {
      id: 6,
      company: "Comfort Line",
      from: "douala",
      to: "yaounde",
      departureTime: "16:00",
      arrivalTime: "19:30",
      duration: "3h 30m",
      price: 5800,
      availableSeats: 12,
      amenities: ["wifi", "ac"],
      departureCategory: "afternoon",
    },
    {
      id: 7,
      company: "Royal Tours",
      from: "douala",
      to: "yaounde",
      departureTime: "18:30",
      arrivalTime: "22:00",
      duration: "3h 30m",
      price: 6500,
      availableSeats: 20,
      amenities: ["wifi", "ac", "tv", "usb"],
      departureCategory: "evening",
    },
    {
      id: 8,
      company: "City Link",
      from: "douala",
      to: "yaounde",
      departureTime: "20:00",
      arrivalTime: "23:30",
      duration: "3h 30m",
      price: 4500,
      availableSeats: 25,
      amenities: ["ac"],
      departureCategory: "evening",
    },
    // Add buses for other routes
    {
      id: 9,
      company: "Express Travel",
      from: "yaounde",
      to: "douala",
      departureTime: "07:30",
      arrivalTime: "11:00",
      duration: "3h 30m",
      price: 5000,
      availableSeats: 20,
      amenities: ["wifi", "ac", "usb"],
      departureCategory: "morning",
    },
    {
      id: 10,
      company: "Comfort Line",
      from: "yaounde",
      to: "bafoussam",
      departureTime: "08:45",
      arrivalTime: "12:45",
      duration: "4h",
      price: 4500,
      availableSeats: 18,
      amenities: ["wifi", "ac"],
      departureCategory: "morning",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      applyFilters()
      setLoading(false)
    }, 1000)
  }, [searchData, priceRange, departureFilters, companyFilters, amenityFilters, sortBy])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Update URL with search params
    navigate(
      `/search?from=${searchData.from}&to=${searchData.to}&date=${searchData.date}&passengers=${searchData.passengers}`,
    )

    // Apply filters
    applyFilters()
  }

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  const handlePriceChange = (e) => {
    setPriceRange(Number.parseInt(e.target.value))
  }

  const handleDepartureFilterChange = (e) => {
    const { name, checked } = e.target
    setDepartureFilters((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleCompanyFilterChange = (e) => {
    const { name, checked } = e.target
    setCompanyFilters((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAmenityFilterChange = (e) => {
    const { name, checked } = e.target
    setAmenityFilters((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const resetFilters = () => {
    setPriceRange(10000)
    setDepartureFilters({
      morning: true,
      afternoon: true,
      evening: false,
    })
    setCompanyFilters({
      "Express Travel": true,
      "Comfort Line": true,
      "Royal Tours": true,
      "City Link": true,
    })
    setAmenityFilters({
      wifi: true,
      ac: true,
      usb: false,
      tv: false,
    })
  }

  const applyFilters = () => {
    // Filter buses based on search criteria and filters
    const filtered = allBuses.filter((bus) => {
      // Match route
      if (searchData.from && searchData.to) {
        if (bus.from !== searchData.from.toLowerCase() || bus.to !== searchData.to.toLowerCase()) {
          return false
        }
      }

      // Price filter
      if (bus.price > priceRange) {
        return false
      }

      // Departure time filter
      if (!departureFilters[bus.departureCategory]) {
        return false
      }

      // Company filter
      if (!companyFilters[bus.company]) {
        return false
      }

      // Amenities filter
      let hasRequiredAmenities = true
      Object.entries(amenityFilters).forEach(([amenity, isRequired]) => {
        if (isRequired && !bus.amenities.includes(amenity)) {
          hasRequiredAmenities = false
        }
      })

      return hasRequiredAmenities
    })

    // Sort buses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "departure":
          return a.departureTime.localeCompare(b.departureTime)
        case "seats":
          return b.availableSeats - a.availableSeats
        default:
          return a.price - b.price
      }
    })

    setFilteredBuses(filtered)
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="amenity-icon" />
      case "ac":
        return <Coffee className="amenity-icon" />
      case "tv":
        return <Tv className="amenity-icon" />
      case "usb":
        return <Usb className="amenity-icon" />
      default:
        return null
    }
  }

  const getAmenityLabel = (amenity) => {
    switch (amenity) {
      case "wifi":
        return "WiFi"
      case "ac":
        return "AC"
      case "tv":
        return "TV"
      case "usb":
        return "USB"
      default:
        return amenity
    }
  }

  const formatCityName = (city) => {
    if (!city) return ""
    return city.charAt(0).toUpperCase() + city.slice(1)
  }

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <div className="container">
          <h1 className="search-header-title">Find Your Bus</h1>
          <div className="search-form">
            <form onSubmit={handleSearch}>
              <div className="search-form-grid">
                <div className="form-group">
                  <label htmlFor="from" className="form-label">
                    From
                  </label>
                  <div className="form-input-with-icon">
                    <MapPin className="icon" />
                    <select
                      id="from"
                      name="from"
                      className="form-select"
                      value={searchData.from}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select departure city</option>
                      <option value="douala">Douala</option>
                      <option value="yaounde">Yaoundé</option>
                      <option value="bafoussam">Bafoussam</option>
                      <option value="bamenda">Bamenda</option>
                      <option value="buea">Buea</option>
                      <option value="limbe">Limbe</option>
                      <option value="kribi">Kribi</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="to" className="form-label">
                    To
                  </label>
                  <div className="form-input-with-icon">
                    <MapPin className="icon" />
                    <select
                      id="to"
                      name="to"
                      className="form-select"
                      value={searchData.to}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select arrival city</option>
                      <option value="douala">Douala</option>
                      <option value="yaounde">Yaoundé</option>
                      <option value="bafoussam">Bafoussam</option>
                      <option value="bamenda">Bamenda</option>
                      <option value="buea">Buea</option>
                      <option value="limbe">Limbe</option>
                      <option value="kribi">Kribi</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <div className="form-input-with-icon">
                    <Calendar className="icon" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-input"
                      value={searchData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="passengers" className="form-label">
                    Passengers
                  </label>
                  <div className="form-input-with-icon">
                    <Users className="icon" />
                    <select
                      id="passengers"
                      name="passengers"
                      className="form-select"
                      value={searchData.passengers}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5 Passengers</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="search-form-actions">
                <button type="submit" className="btn btn-primary">
                  <Search className="search-icon" />
                  Search Buses
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="search-results">
        <div className="container">
          <div className="search-layout">
            {/* Sidebar Filters */}
            <div className="search-sidebar">
              <div className="search-filters">
                <div className="search-filters-header">
                  <h2 className="search-filters-title">Filters</h2>
                  <button className="search-filters-toggle" onClick={toggleFilters} aria-label="Toggle filters">
                    {filtersOpen ? <ChevronUp className="filter-icon" /> : <ChevronDown className="filter-icon" />}
                  </button>
                </div>
                <div className={`search-filters-content ${filtersOpen ? "open" : ""}`}>
                  <div className="search-filter-group">
                    <h3 className="search-filter-heading">Price Range</h3>
                    <div className="search-filter-price-range">
                      <input
                        type="range"
                        min="3000"
                        max="10000"
                        step="100"
                        value={priceRange}
                        onChange={handlePriceChange}
                        className="form-range"
                      />
                    </div>
                    <div className="search-filter-price-labels">
                      <span>3,000 FCFA</span>
                      <span>{priceRange.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  <div className="search-filter-group">
                    <h3 className="search-filter-heading">Departure Time</h3>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="morning"
                          checked={departureFilters.morning}
                          onChange={handleDepartureFilterChange}
                        />
                        Morning (6:00 - 12:00)
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="afternoon"
                          checked={departureFilters.afternoon}
                          onChange={handleDepartureFilterChange}
                        />
                        Afternoon (12:00 - 18:00)
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="evening"
                          checked={departureFilters.evening}
                          onChange={handleDepartureFilterChange}
                        />
                        Evening (18:00 - 24:00)
                      </label>
                    </div>
                  </div>
                  <div className="search-filter-group">
                    <h3 className="search-filter-heading">Bus Companies</h3>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="Express Travel"
                          checked={companyFilters["Express Travel"]}
                          onChange={handleCompanyFilterChange}
                        />
                        Express Travel
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="Comfort Line"
                          checked={companyFilters["Comfort Line"]}
                          onChange={handleCompanyFilterChange}
                        />
                        Comfort Line
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="Royal Tours"
                          checked={companyFilters["Royal Tours"]}
                          onChange={handleCompanyFilterChange}
                        />
                        Royal Tours
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="City Link"
                          checked={companyFilters["City Link"]}
                          onChange={handleCompanyFilterChange}
                        />
                        City Link
                      </label>
                    </div>
                  </div>
                  <div className="search-filter-group">
                    <h3 className="search-filter-heading">Amenities</h3>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="wifi"
                          checked={amenityFilters.wifi}
                          onChange={handleAmenityFilterChange}
                        />
                        WiFi
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="ac"
                          checked={amenityFilters.ac}
                          onChange={handleAmenityFilterChange}
                        />
                        Air Conditioning
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="usb"
                          checked={amenityFilters.usb}
                          onChange={handleAmenityFilterChange}
                        />
                        USB Charging
                      </label>
                    </div>
                    <div className="search-filter-checkbox">
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          name="tv"
                          checked={amenityFilters.tv}
                          onChange={handleAmenityFilterChange}
                        />
                        TV
                      </label>
                    </div>
                  </div>
                  <div className="search-filter-actions">
                    <button className="btn btn-outline btn-block" onClick={resetFilters}>
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Results Content */}
            <div className="search-content">
              <div className="search-results-header">
                <h2 className="search-results-count">
                  {loading ? "Loading..." : `${filteredBuses.length} Buses Found`}
                </h2>
                <div className="search-results-sort">
                  <select className="form-select" value={sortBy} onChange={handleSortChange}>
                    <option value="price">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                    <option value="departure">Sort by: Departure Time</option>
                    <option value="seats">Sort by: Available Seats</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="search-loading">
                  <div className="loading-spinner"></div>
                  <p>Searching for buses...</p>
                </div>
              ) : filteredBuses.length === 0 ? (
                <div className="search-no-results">
                  <p>No buses found for your search criteria.</p>
                  <p>Try adjusting your filters or search for a different route.</p>
                </div>
              ) : (
                <div className="search-results-list">
                  {filteredBuses.map((bus) => (
                    <div className="bus-card" key={bus.id}>
                      <div className="bus-card-content">
                        <div className="bus-card-header">
                          <div>
                            <div className="bus-company">
                              <Bus className="bus-company-icon" />
                              <span className="bus-company-name">{bus.company}</span>
                            </div>
                            <div className="bus-schedule">
                              <div className="bus-time-group">
                                <p>Departure</p>
                                <p>{bus.departureTime}</p>
                              </div>
                              <ArrowRight className="bus-time-arrow" />
                              <div className="bus-time-group">
                                <p>Arrival</p>
                                <p>{bus.arrivalTime}</p>
                              </div>
                              <div className="bus-duration">
                                <Clock className="bus-duration-icon" />
                                <span>{bus.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bus-price-group">
                            <div className="bus-price">{bus.price.toLocaleString()} FCFA</div>
                            <div className="bus-seats">{bus.availableSeats} seats available</div>
                          </div>
                        </div>
                        <div className="bus-route">
                          <span>{formatCityName(bus.from)}</span>
                          <span className="bus-route-arrow">→</span>
                          <span>{formatCityName(bus.to)}</span>
                        </div>
                        <div className="bus-amenities">
                          {bus.amenities.map((amenity) => (
                            <div className="bus-amenity" key={amenity}>
                              {getAmenityIcon(amenity)}
                              {getAmenityLabel(amenity)}
                            </div>
                          ))}
                        </div>
                        <div className="bus-actions">
                          <button className="btn btn-outline btn-sm">View Details</button>
                          <Link
                            to={`/select-seat/${bus.id}?from=${bus.from}&to=${bus.to}&date=${searchData.date}&passengers=${searchData.passengers}`}
                            className="btn btn-primary"
                          >
                            Select Seats
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

