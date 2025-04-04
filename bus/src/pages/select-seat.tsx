"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Bus,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Info,
  MapPin,
  User,
  Users,
  X,
} from "lucide-react"
import "../styles/select-seat.css"

interface BusDetails {
  id: number;
  company: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  bookedSeats: string[];
  amenities: string[];
}

export default function SelectSeatPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const [loading, setLoading] = useState(true)
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [showSeatInfo, setShowSeatInfo] = useState(false)

  const from = searchParams.get("from") || "douala"
  const to = searchParams.get("to") || "yaounde"
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0]
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")

  useEffect(() => {
    // Simulate API call to get bus details
    setLoading(true)
    const mockBusData: BusDetails = {
      id: id ? parseInt(id) : 0,
      company: "Express Travel",
      from: from,
      to: to,
      date: date,
      departureTime: "08:00",
      arrivalTime: "11:30",
      duration: "3h 30m",
      price: 5000,
      totalSeats: 40,
      availableSeats: 23,
      bookedSeats: ["A1", "A4", "B2", "B3", "C1", "C4", "D2", "D3", "E1", "E4", "F2", "F3", "G1", "G4", "H2", "H3", "I1"],
      amenities: ["wifi", "ac", "usb", "tv"],
    }

    setTimeout(() => {
      setBusDetails(mockBusData)
      setLoading(false)
    }, 1000)
  }, [id, from, to, date])

  const handleSeatClick = (seat: string) => {
    if (!busDetails) return;
    
    if (busDetails.bookedSeats.includes(seat)) {
      return // Seat is already booked
    }

    if (selectedSeats.includes(seat)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      // Check if maximum number of passengers is reached
      if (selectedSeats.length >= passengers) {
        // Replace the first selected seat with the new one
        const newSelectedSeats = [...selectedSeats]
        newSelectedSeats.shift()
        newSelectedSeats.push(seat)
        setSelectedSeats(newSelectedSeats)
      } else {
        // Add new seat
        setSelectedSeats([...selectedSeats, seat])
      }
    }
  }

  const getSeatStatus = (seat: string) => {
    if (!busDetails) return "booked";
    
    if (busDetails.bookedSeats.includes(seat)) {
      return "booked"
    }
    if (selectedSeats.includes(seat)) {
      return "selected"
    }
    return "available"
  }

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    return (
      <div className="seat-layout">
        <div className="bus-front">
          <div className="bus-driver">
            <User className="driver-icon" />
            <span>Driver</span>
          </div>
          <div className="bus-door">Door</div>
        </div>

        <div className="seat-grid">
          {rows.map((row) => (
            <div className="seat-row" key={row}>
              <div className="row-label">{row}</div>
              <div className="seats">
                {[1, 2, 3, 4].map((num) => {
                  const seat = `${row}${num}`
                  const status = getSeatStatus(seat)

                  return (
                    <button
                      key={seat}
                      className={`seat ${status} ${num === 2 || num === 3 ? "aisle-right" : ""}`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status === "booked"}
                      aria-label={`Seat ${seat}, ${status}`}
                    >
                      {num}
                      {status === "selected" && <Check className="seat-icon" />}
                      {status === "booked" && <X className="seat-icon" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const formatCityName = (city: string) => {
    if (!city) return ""
    return city.charAt(0).toUpperCase() + city.slice(1)
  }

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat")
      return
    }

    if (!busDetails) return;

    // Navigate to payment page with selected seats
    navigate(`/payment/${id}?from=${from}&to=${to}&date=${date}&seats=${selectedSeats.join(",")}`)
  }

  if (loading) {
    return (
      <div className="select-seat-page">
        <div className="container">
          <div className="select-seat-loading">
            <div className="loading-spinner"></div>
            <p>Loading bus details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!busDetails) {
    return (
      <div className="select-seat-page">
        <div className="container">
          <div className="select-seat-error">
            <p>No bus details available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="select-seat-page">
      <div className="container">
        <Link to={`/search?from=${from}&to=${to}&date=${date}&passengers=${passengers}`} className="back-link">
          <ArrowLeft className="back-icon" />
          Back to search results
        </Link>

        <h1 className="page-title">Select Your Seats</h1>

        <div className="select-seat-layout">
          <div className="seat-selection-container">
            <div className="bus-details-card">
              <div className="bus-details-header">
                <div className="bus-company">
                  <Bus className="bus-company-icon" />
                  <span className="bus-company-name">{busDetails.company}</span>
                </div>
                <div className="bus-route">
                  <div className="route-city">
                    <MapPin className="route-icon" />
                    <span>{formatCityName(busDetails.from)}</span>
                  </div>
                  <ChevronRight className="route-arrow" />
                  <div className="route-city">
                    <MapPin className="route-icon" />
                    <span>{formatCityName(busDetails.to)}</span>
                  </div>
                </div>
              </div>

              <div className="bus-details-info">
                <div className="info-item">
                  <Calendar className="info-icon" />
                  <div>
                    <span className="info-label">Date</span>
                    <span className="info-value">
                      {new Date(busDetails.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <span className="info-label">Departure</span>
                    <span className="info-value">{busDetails.departureTime}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <span className="info-label">Arrival</span>
                    <span className="info-value">{busDetails.arrivalTime}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Users className="info-icon" />
                  <div>
                    <span className="info-label">Passengers</span>
                    <span className="info-value">{passengers}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="seat-legend">
              <button className="legend-info-btn" onClick={() => setShowSeatInfo(!showSeatInfo)}>
                <Info className="legend-info-icon" />
                Seat Information
              </button>

              {showSeatInfo && (
                <div className="seat-info-modal">
                  <div className="seat-info-content">
                    <div className="seat-info-header">
                      <h3>Seat Information</h3>
                      <button className="seat-info-close" onClick={() => setShowSeatInfo(false)}>
                        <X className="close-icon" />
                      </button>
                    </div>
                    <div className="seat-info-body">
                      <p>
                        Our buses have comfortable seats with ample legroom. The seating arrangement is 2+2 with an
                        aisle in the middle.
                      </p>
                      <div className="seat-types">
                        <div className="seat-type">
                          <div className="seat available mini"></div>
                          <span>Available</span>
                        </div>
                        <div className="seat-type">
                          <div className="seat selected mini"></div>
                          <span>Selected</span>
                        </div>
                        <div className="seat-type">
                          <div className="seat booked mini"></div>
                          <span>Booked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="legend-items">
                <div className="legend-item">
                  <div className="seat available mini"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="seat selected mini"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="seat booked mini"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>

            {renderSeats()}
          </div>

          <div className="booking-summary">
            <div className="summary-card">
              <h2 className="summary-title">Booking Summary</h2>

              <div className="summary-route">
                <div className="summary-from">
                  <span className="city-label">From</span>
                  <span className="city-name">{formatCityName(busDetails.from)}</span>
                </div>
                <div className="summary-arrow">→</div>
                <div className="summary-to">
                  <span className="city-label">To</span>
                  <span className="city-name">{formatCityName(busDetails.to)}</span>
                </div>
              </div>

              <div className="summary-details">
                <div className="summary-item">
                  <span className="summary-label">Date</span>
                  <span className="summary-value">
                    {new Date(busDetails.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Departure</span>
                  <span className="summary-value">{busDetails.departureTime}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Bus Company</span>
                  <span className="summary-value">{busDetails.company}</span>
                </div>
              </div>

              <div className="selected-seats-summary">
                <h3 className="seats-title">Selected Seats</h3>
                {selectedSeats.length === 0 ? (
                  <p className="no-seats">No seats selected yet</p>
                ) : (
                  <div className="seats-list">
                    {selectedSeats.map((seat) => (
                      <div className="selected-seat-item" key={seat}>
                        <span className="seat-label">Seat {seat}</span>
                        <span className="seat-price">{busDetails.price.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="price-summary">
                <div className="price-item subtotal">
                  <span>Subtotal</span>
                  <span>{(busDetails.price * selectedSeats.length).toLocaleString()} FCFA</span>
                </div>
                <div className="price-item fee">
                  <span>Booking Fee</span>
                  <span>500 FCFA</span>
                </div>
                <div className="price-item total">
                  <span>Total</span>
                  <span>{(busDetails.price * selectedSeats.length + 500).toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                >
                  <CreditCard className="btn-icon" />
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}