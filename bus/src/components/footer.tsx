import { Link } from "react-router-dom"
import { Bus, Facebook, Instagram, Twitter } from "lucide-react"
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Bus className="footer-brand-icon" />
              <span className="footer-brand-text">TravelEase</span>
            </div>
            <p className="footer-description">
              Book bus tickets online, choose your seats, and get travel information with ease.
            </p>
            <div className="footer-social">
              <Link to="#" className="footer-social-link">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="footer-social-link">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="footer-social-link">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search" className="footer-link">
                  Find Buses
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/bookings" className="footer-link">
                  My Bookings
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Popular Routes</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/search?from=Douala&to=Yaoundé" className="footer-link">
                  Douala to Yaoundé
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?from=Yaoundé&to=Bamenda" className="footer-link">
                  Yaoundé to Bamenda
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?from=Douala&to=Bafoussam" className="footer-link">
                  Douala to Bafoussam
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/search?from=Yaoundé&to=Kribi" className="footer-link">
                  Yaoundé to Kribi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-links">
              <li className="footer-contact-item">123 Avenue de l'Indépendance</li>
              <li className="footer-contact-item">Douala, Cameroon</li>
              <li className="footer-contact-item">support@travelease.cm</li>
              <li className="footer-contact-item">+237 233 123 456</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

