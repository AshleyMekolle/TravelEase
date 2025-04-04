"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Bus, Clock, Download, Eye, MapPin, TicketIcon, Trash2 } from "lucide-react"
import "../styles/bookings.css"

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock booking data
  const upcomingBookings = [
    {
      id: "BK12345",
      date: "July 15, 2023",
      status: "confirmed",
      from: "Douala",
      to: "Yaoundé",
      departureTime: "08:00",
      arrivalTime: "11:30",
      company: "Express Travel",
      seats: [12, 13],
      price: 10000,
    },
    {
      id: "BK12346",
      date: "August 5, 2023",
      status: "confirmed",
      from: "Yaoundé",
      to: "Bamenda",
      departureTime: "09:30",
      arrivalTime: "14:30",
      company: "Royal Tours",
      seats: [5],
      price: 7500,
    },
  ]

  const pastBookings = [
    {
      id: "BK12340",
      date: "June 20, 2023",
      status: "completed",
      from: "Douala",
      to: "Bafoussam",
      departureTime: "10:00",
      arrivalTime: "13:00",
      company: "Comfort Line",
      seats: [8],
      price: 6000,
    },
    {
      id: "BK12338",
      date: "May 15, 2023",
      status: "completed",
      from: "Yaoundé",
      to: "Douala",
      departureTime: "14:30",
      arrivalTime: "18:00",
      company: "Express Travel",
      seats: [22, 23],
      price: 10000,
    },
    {
      id: "BK12335",
      date: "April 2, 2023",
      status: "completed",
      from: "Bamenda",
      to: "Yaoundé",
      departureTime: "07:00",
      arrivalTime: "12:00",
      company: "Royal Tours",
      seats: [17],
      price: 7500,
    },
  ]

  const bookings = activeTab === "upcoming" ? upcomingBookings : pastBookings

  return (
    <div className="bookings-page">
      <div className="container bookings-container">
        <h1 className="bookings-title">My Bookings</h1>

        <div className="bookings-tabs">
          <div className="bookings-tabs-list">
            <div
              className={`bookings-tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Bookings
            </div>
            <div
              className={`bookings-tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past Bookings
            </div>
          </div>
        </div>

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div className="card booking-card" key={booking.id}>
                <div className="card-content">
                  <div className="booking-header">
                    <div className="booking-id-group">
                      <div className="booking-id">{booking.id}</div>
                      <div className="booking-date">{booking.date}</div>
                    </div>
                    <div className={`booking-status ${booking.status}`}>
                      {booking.status === "confirmed" ? "Confirmed" : "Completed"}
                    </div>
                  </div>

                  <div className="booking-route">
                    <div className="booking-location">
                      <div className="booking-location-icon">
                        <MapPin />
                      </div>
                      <div className="booking-location-text">
                        <p>From</p>
                        <p>{booking.from}</p>
                      </div>
                    </div>
                    <ArrowRight className="booking-route-arrow" />
                    <div className="booking-location">
                      <div className="booking-location-icon">
                        <MapPin />
                      </div>
                      <div className="booking-location-text">
                        <p>To</p>
                        <p>{booking.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail">
                      <div className="booking-detail-icon">
                        <Bus />
                      </div>
                      <div className="booking-detail-text">
                        <p>Bus Company</p>
                        <p>{booking.company}</p>
                      </div>
                    </div>
                    <div className="booking-detail">
                      <div className="booking-detail-icon">
                        <Clock />
                      </div>
                      <div className="booking-detail-text">
                        <p>Departure Time</p>
                        <p>{booking.departureTime}</p>
                      </div>
                    </div>
                    <div className="booking-detail">
                      <div className="booking-detail-icon">
                        <TicketIcon />
                      </div>
                      <div className="booking-detail-text">
                        <p>Seat Numbers</p>
                        <p>{booking.seats.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-price">
                      <p>Total Price</p>
                      <p>{booking.price.toLocaleString()} FCFA</p>
                    </div>
                    <div className="booking-actions">
                      {activeTab === "upcoming" ? (
                        <>
                          <button className="btn btn-outline btn-sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </button>
                          <button className="btn btn-outline btn-sm">
                            <Download className="h-4 w-4 mr-2" />
                            Ticket
                          </button>
                          <button className="btn btn-outline btn-sm btn-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-outline btn-sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </button>
                          <button className="btn btn-outline btn-sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-bookings">
            <div className="empty-bookings-icon">
              <TicketIcon />
            </div>
            <h2 className="empty-bookings-title">No bookings found</h2>
            <p className="empty-bookings-description">You don't have any {activeTab} bookings yet.</p>
            <Link to="/search" className="btn btn-primary">
              Book a Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

