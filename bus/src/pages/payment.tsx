/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Check, CreditCard, Loader2, Phone, Shield } from "lucide-react"
import "../styles/payment.css"

interface BookingDetails {
  id: number;
  company: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats: string[];
  subtotal: number;
  bookingFee: number;
  total: number;
}

interface CardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface MobileData {
  phoneNumber: string;
  provider: string;
}

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const from = searchParams.get("from") ?? "douala"
  const to = searchParams.get("to") ?? "yaounde"
  const date = searchParams.get("date") ?? new Date().toISOString().split("T")[0]
  const seatsParam = searchParams.get("seats") ?? "A2"
  const selectedSeats = seatsParam.split(",")

  // Form state
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })

  const [mobileData, setMobileData] = useState<MobileData>({
    phoneNumber: "",
    provider: "mtn",
  })

  useEffect(() => {
    setLoading(true)
    const details = {
      id: Number.parseInt(id ?? "0"),
      company: "Express Travel",
      from: from,
      to: to,
      date: date,
      departureTime: "08:00",
      arrivalTime: "11:30",
      duration: "3h 30m",
      price: 5000,
      seats: selectedSeats,
      subtotal: 5000 * selectedSeats.length,
      bookingFee: 500,
      total: 5000 * selectedSeats.length + 500,
    }

    setTimeout(() => {
      setBookingDetails(details)
      setLoading(false)
    }, 1000)
  }, [id, from, to, date, selectedSeats])

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMobileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProviderChange = (provider: string) => {
    setMobileData((prev) => ({
      ...prev,
      provider,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    setTimeout(() => {
      setProcessing(false)
      navigate(`/booking-confirmation/${id}?seats=${selectedSeats.join(",")}`)
    }, 2000)
  }

  const formatCityName = (city: string) => {
    if (!city) return ""
    return city.charAt(0).toUpperCase() + city.slice(1)
  }

  if (loading) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="payment-loading">
            <div className="loading-spinner"></div>
            <p>Loading booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!bookingDetails) {
    return <div>No booking details available</div>
  }

  return (
    <div className="payment-page">
      <div className="container">
        <Link to={`/select-seat/${id}?from=${from}&to=${to}&date=${date}`} className="back-link">
          <ArrowLeft className="back-icon" />
          Back to seat selection
        </Link>

        <h1 className="page-title">Payment</h1>

        <div className="payment-layout">
          <div className="payment-methods-container">
            <div className="payment-card">
              <div className="payment-card-header">
                <h2 className="payment-card-title">Choose Payment Method</h2>
                <p className="payment-card-description">
                  Select your preferred payment method to complete your booking
                </p>
              </div>

              <div className="payment-tabs">
                <div className="payment-tabs-list">
                  <button
                    className={`payment-tab ${paymentMethod === "card" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="payment-tab-icon" />
                    Credit Card
                  </button>
                  <button
                    className={`payment-tab ${paymentMethod === "mobile" ? "active" : ""}`}
                    onClick={() => setPaymentMethod("mobile")}
                  >
                    <Phone className="payment-tab-icon" />
                    Mobile Money
                  </button>
                </div>

                <div className="payment-tab-content">
                  {paymentMethod === "card" ? (
                    <form onSubmit={handleSubmit} className="payment-form">
                      <div className="form-group">
                        <label htmlFor="cardNumber" className="form-label">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardHolder" className="form-label">
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          id="cardHolder"
                          name="cardHolder"
                          className="form-input"
                          placeholder="John Doe"
                          value={cardData.cardHolder}
                          onChange={handleCardChange}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate" className="form-label">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            className="form-input"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={handleCardChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv" className="form-label">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            className="form-input"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={processing}>
                        {processing ? (
                          <>
                            <Loader2 className="btn-icon spinner" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="btn-icon" />
                            Pay {bookingDetails.total.toLocaleString()} FCFA
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="payment-form">
                      <div className="form-group">
                        <label className="form-label">Mobile Money Provider</label>
                        <div className="provider-options">
                          <button
                            type="button"
                            className={`provider-option ${mobileData.provider === "mtn" ? "active" : ""}`}
                            onClick={() => handleProviderChange("mtn")}
                          >
                            <div className="provider-logo mtn">MTN</div>
                            <span>MTN Mobile Money</span>
                            {mobileData.provider === "mtn" && <Check className="provider-check" />}
                          </button>

                          <button
                            type="button"
                            className={`provider-option ${mobileData.provider === "orange" ? "active" : ""}`}
                            onClick={() => handleProviderChange("orange")}
                          >
                            <div className="provider-logo orange">OM</div>
                            <span>Orange Money</span>
                            {mobileData.provider === "orange" && <Check className="provider-check" />}
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="form-input"
                          placeholder="+237 6XX XXX XXX"
                          value={mobileData.phoneNumber}
                          onChange={handleMobileChange}
                          required
                        />
                      </div>

                      <p className="mobile-info">You will receive a prompt on your phone to confirm the payment.</p>

                      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={processing}>
                        {processing ? (
                          <>
                            <Loader2 className="btn-icon spinner" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Phone className="btn-icon" />
                            Pay {bookingDetails.total.toLocaleString()} FCFA
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="payment-security">
                <Shield className="security-icon" />
                <p>Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>

          <div className="booking-summary">
            <div className="summary-card">
              <h2 className="summary-title">Booking Summary</h2>

              <div className="summary-route">
                <div className="summary-from">
                  <span className="city-label">From</span>
                  <span className="city-name">{formatCityName(bookingDetails.from)}</span>
                </div>
                <div className="summary-arrow">→</div>
                <div className="summary-to">
                  <span className="city-label">To</span>
                  <span className="city-name">{formatCityName(bookingDetails.to)}</span>
                </div>
              </div>

              <div className="summary-details">
                <div className="summary-item">
                  <span className="summary-label">Date</span>
                  <span className="summary-value">
                    {new Date(bookingDetails.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Departure</span>
                  <span className="summary-value">{bookingDetails.departureTime}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Bus Company</span>
                  <span className="summary-value">{bookingDetails.company}</span>
                </div>
              </div>

              <div className="selected-seats-summary">
                <h3 className="seats-title">Selected Seats</h3>
                <div className="seats-list">
                  {bookingDetails.seats.map((seat) => (
                    <div className="selected-seat-item" key={seat}>
                      <span className="seat-label">Seat {seat}</span>
                      <span className="seat-price">{bookingDetails.price.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="price-summary">
                <div className="price-item subtotal">
                  <span>Subtotal</span>
                  <span>{bookingDetails.subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="price-item fee">
                  <span>Booking Fee</span>
                  <span>{bookingDetails.bookingFee.toLocaleString()} FCFA</span>
                </div>
                <div className="price-item total">
                  <span>Total</span>
                  <span>{bookingDetails.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}