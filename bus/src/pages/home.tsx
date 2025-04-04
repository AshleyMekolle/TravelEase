import { Link } from "react-router-dom"
import { ArrowRight, Bus, Calendar, Clock, CreditCard, MapPin, Search, Shield } from "lucide-react"
import "../styles/home.css"

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Book Your <span className="hero-title-highlight">Bus Tickets</span> Online with Ease
              </h1>
              <p className="hero-description">
                Find and book bus tickets for your next journey. Choose your seats, compare prices, and travel
                comfortably.
              </p>
              <div className="hero-actions">
                <Link to="/search" className="btn btn-primary btn-lg">
                  Find Buses
                </Link>
                <Link to="/routes" className="btn btn-outline btn-lg">
                  View Popular Routes
                </Link>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-image">
                <img src="/bus1.png" alt="Bus travel" />
              </div>
              <div className="hero-badge">
                <div className="hero-badge-content">
                  <div className="hero-badge-icon">
                    <Shield />
                  </div>
                  <div className="hero-badge-text">
                    <p>Trusted by</p>
                    <p>10,000+ travelers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Box */}
      <div className="container">
        <div className="search-box">
          <div className="search-grid">
            <div className="form-group">
              <label htmlFor="from" className="form-label">
                From
              </label>
              <div className="form-input-with-icon">
                <MapPin className="icon" />
                <select id="from" className="form-select">
                  <option value="">Select departure city</option>
                  <option value="douala">Douala</option>
                  <option value="yaounde">Yaoundé</option>
                  <option value="bafoussam">Bafoussam</option>
                  <option value="bamenda">Bamenda</option>
                  <option value="buea">Buea</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="to" className="form-label">
                To
              </label>
              <div className="form-input-with-icon">
                <MapPin className="icon" />
                <select id="to" className="form-select">
                  <option value="">Select destination city</option>
                  <option value="douala">Douala</option>
                  <option value="yaounde">Yaoundé</option>
                  <option value="bafoussam">Bafoussam</option>
                  <option value="bamenda">Bamenda</option>
                  <option value="buea">Buea</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <div className="form-input-with-icon">
                <Calendar className="icon" />
                <input type="date" id="date" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="passengers" className="form-label">
                Passengers
              </label>
              <div className="form-input-with-icon">
                <CreditCard className="icon" />
                <select id="passengers" className="form-select">
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                </select>
              </div>
            </div>
          </div>
          <div className="search-actions">
            <Link to="/search" className="btn btn-primary">
              <Search className="h-4 w-4 mr-2" />
              Search Buses
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose TravelEase?</h2>
            <p className="section-description">
              We make bus travel simple and convenient with features designed for a seamless booking experience.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search />
              </div>
              <h3 className="feature-title">Easy Search</h3>
              <p className="feature-description">
                Find buses quickly with our simple search. Filter by time, price, and amenities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CreditCard />
              </div>
              <h3 className="feature-title">Secure Payments</h3>
              <p className="feature-description">
                Book with confidence using our secure payment options. No hidden fees.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Bus />
              </div>
              <h3 className="feature-title">Seat Selection</h3>
              <p className="feature-description">
                Choose your preferred seat with our interactive seat map for a comfortable journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="routes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Routes</h2>
            <p className="section-description">
              Discover our most traveled bus routes with competitive prices and frequent departures.
            </p>
          </div>

          <div className="routes-grid">
            {[5, 2, 3, 4, 5, 6].map((route) => (
              <div className="route-card" key={route}>
                <div className="route-image">
                  <img src={`/bus${route}.png`} alt="Bus route" />
                </div>
                <div className="route-content">
                  <div className="route-header">
                    <div className="route-cities">
                      <span className="route-city">Douala</span>
                      <span className="route-line"></span>
                      <span className="route-city">Yaoundé</span>
                    </div>
                    <div className="route-time">
                      <Clock className="h-4 w-4" />
                      <span>3h 30m</span>
                    </div>
                  </div>
                  <div className="route-details">
                    <div className="route-price">5,000 FCFA</div>
                    <div className="route-actions">
                      <Link to="/search" className="btn btn-primary btn-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="routes-more">
            <Link to="/routes" className="btn btn-outline">
              View All Routes
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Booking your bus ticket with TravelEase is quick and easy. Just follow these simple steps.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">
                <Search />
              </div>
              <h3 className="step-title">Search</h3>
              <p className="step-description">
                Enter your departure, destination, date, and number of passengers to find available buses.
              </p>
            </div>
            <div className="step">
              <div className="step-icon">
                <Bus />
              </div>
              <h3 className="step-title">Select</h3>
              <p className="step-description">Choose your preferred bus and seat from the available options.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <CreditCard />
              </div>
              <h3 className="step-title">Pay</h3>
              <p className="step-description">
                Complete your booking by making a secure payment with your preferred method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Your Journey?</h2>
              <p className="cta-description">
                Book your bus tickets now and enjoy a comfortable and convenient travel experience.
              </p>
              <div className="cta-actions">
                <Link to="/search" className="btn btn-secondary btn-lg">
                  Find Buses
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg cta-btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="cta-image">
              <img src="/bus1.png" alt="Bus travel" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-description">
              Read testimonials from travelers who have booked and traveled with TravelEase.
            </p>
          </div>

          <div className="testimonials-grid">
            {[1, 2, 3].map((testimonial) => (
              <div className="testimonial-card" key={testimonial}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-quote">
                  "TravelEase made booking my bus tickets so easy. The seat selection feature was very helpful, and the
                  prices were competitive. Will definitely use again!"
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={`/avatar${testimonial}.png`} alt="Customer" />
                  </div>
                  <div className="testimonial-info">
                    <p>Customer Name</p>
                    <p>Frequent Traveler</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

