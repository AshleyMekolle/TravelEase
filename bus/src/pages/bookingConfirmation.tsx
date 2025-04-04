"use client"

import { useState, useEffect, useCallback } from "react"
import { Link, useParams, useLocation, } from "react-router-dom"
import { ArrowLeft, Bus, Check, Clock, Download, Printer, Share2, Star, Ticket } from "lucide-react"
import "../styles/booking-confirmation.css"

interface BookingDetails {
  id: number
  reference: string
  company: string
  from: string
  to: string
  date: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  seats: string[]
  subtotal: number
  bookingFee: number
  total: number
  status: string
  paymentMethod: string
  bookingDate: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
}

export default function BookingConfirmationPage() {
  const { id } = useParams<{ id?: string }>()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [loading, setLoading] = useState(true)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)

  const seatsParam = searchParams.get("seats") || "A2"
  const selectedSeats = seatsParam.split(",")

  // Generate a random booking reference
  const generateBookingReference = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }, [])

  // Mock booking details
  const mockBookingDetails = useCallback(() => {
    return {
      id: id ? parseInt(id) : 0,
      reference: generateBookingReference(),
      company: "Express Travel",
      from: "douala",
      to: "yaounde",
      date: new Date().toISOString().split("T")[0],
      departureTime: "08:00",
      arrivalTime: "11:30",
      duration: "3h 30m",
      price: 5000,
      seats: selectedSeats,
      subtotal: 5000 * selectedSeats.length,
      bookingFee: 500,
      total: 5000 * selectedSeats.length + 500,
      status: "confirmed",
      paymentMethod: "Credit Card",
      bookingDate: new Date().toISOString(),
      passengerName: "John Doe",
      passengerEmail: "john.doe@example.com",
      passengerPhone: "+237 6XX XXX XXX",
    }
  }, [generateBookingReference, id, selectedSeats])

  useEffect(() => {
    // Simulate API call to get booking details
    setLoading(true)
    setTimeout(() => {
      const details = mockBookingDetails()
      setBookingDetails(details)
      setLoading(false)

      // Save booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem("travelease-bookings") || "[]")
      const newBooking = {
        ...details,
        id: existingBookings.length + 1,
      }
      localStorage.setItem("travelease-bookings", JSON.stringify([...existingBookings, newBooking]))
    }, 1000)
  }, [id, mockBookingDetails])

  const formatCityName = (city: string): string => {
    if (!city) return ""
    return city.charAt(0).toUpperCase() + city.slice(1)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert("Ticket downloaded successfully!")
  }

  const handleShare = () => {
    if (!bookingDetails) return

    if (navigator.share) {
      navigator.share({
        title: "My Bus Ticket",
        text: `I've booked a bus from ${formatCityName(bookingDetails.from)} to ${formatCityName(bookingDetails.to)} on ${formatDate(bookingDetails.date)}`,
        url: window.location.href,
      }).catch(err => {
        console.error("Error sharing:", err)
      })
    } else {
      alert("Sharing is not supported on this browser")
    }
  }

  if (loading) {
    return (
      <div className="booking-confirmation-page">
        <div className="container">
          <div className="booking-loading">
            <div className="loading-spinner"></div>
            <p>Loading booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="booking-confirmation-page">
        <div className="container">
          <div className="booking-error">
            <p>No booking details found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-confirmation-page">
      <div className="container">
        <Link to="/bookings" className="back-link">
          <ArrowLeft className="back-icon" />
          View all bookings
        </Link>

        <div className="booking-success">
          <div className="success-icon">
            <Check className="check-icon" />
          </div>
          <h1 className="success-title">Booking Confirmed!</h1>
          <p className="success-message">Your bus ticket has been booked successfully.</p>
        </div>

        <div className="ticket-container">
          <div className="ticket">
            <div className="ticket-header">
              <div className="ticket-company">
                <Bus className="company-icon" />
                <span>{bookingDetails.company}</span>
              </div>
              <div className="ticket-reference">
                <span className="reference-label">Booking Reference</span>
                <span className="reference-value">{bookingDetails.reference}</span>
              </div>
            </div>

            <div className="ticket-route">
              <div className="route-from">
                <div className="route-dot from"></div>
                <div className="route-details">
                  <span className="route-city">{formatCityName(bookingDetails.from)}</span>
                  <span className="route-time">{bookingDetails.departureTime}</span>
                </div>
              </div>
              <div className="route-line"></div>
              <div className="route-to">
                <div className="route-dot to"></div>
                <div className="route-details">
                  <span className="route-city">{formatCityName(bookingDetails.to)}</span>
                  <span className="route-time">{bookingDetails.arrivalTime}</span>
                </div>
              </div>
            </div>

            <div className="ticket-details">
              <div className="ticket-detail">
                <span className="detail-label">Date</span>
                <span className="detail-value">{formatDate(bookingDetails.date)}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Duration</span>
                <span className="detail-value">{bookingDetails.duration}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Seats</span>
                <span className="detail-value">{bookingDetails.seats.join(", ")}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">Passenger</span>
                <span className="detail-value">{bookingDetails.passengerName}</span>
              </div>
            </div>

            <div className="ticket-barcode">
              <div className="barcode-image"></div>
              <div className="barcode-text">Scan this barcode at the bus station</div>
            </div>

            <div className="ticket-footer">
              <div className="ticket-status">
                <span className={`status-badge ${bookingDetails.status}`}>{bookingDetails.status}</span>
              </div>
              <div className="ticket-price">
                <span className="price-label">Total Paid</span>
                <span className="price-value">{bookingDetails.total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-actions">
          <button className="btn btn-outline ticket-action-btn" onClick={handlePrint}>
            <Printer className="action-icon" />
            Print Ticket
          </button>
          <button className="btn btn-outline ticket-action-btn" onClick={handleDownload}>
            <Download className="action-icon" />
            Download Ticket
          </button>
          <button className="btn btn-outline ticket-action-btn" onClick={handleShare}>
            <Share2 className="action-icon" />
            Share
          </button>
        </div>

        <div className="booking-next-steps">
          <h2 className="next-steps-title">What's Next?</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <Ticket className="step-icon-svg" />
              </div>
              <h3 className="step-title">Your Ticket</h3>
              <p className="step-description">
                Show your ticket at the bus station to board the bus. You can print it or show the digital version.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <Clock className="step-icon-svg" />
              </div>
              <h3 className="step-title">Arrive Early</h3>
              <p className="step-description">
                Please arrive at the bus station at least 30 minutes before departure time.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">
                <Star className="step-icon-svg" />
              </div>
              <h3 className="step-title">Rate Your Experience</h3>
              <p className="step-description">
                After your journey, please rate your experience to help us improve our service.
              </p>
            </div>
          </div>
        </div>

        <div className="booking-cta">
          <Link to="/" className="btn btn-outline cta-btn">
            Book Another Trip
          </Link>
          <Link to="/bookings" className="btn btn-primary cta-btn">
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  )
}