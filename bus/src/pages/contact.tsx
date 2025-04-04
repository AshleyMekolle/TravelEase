"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"
import "../styles/contact.css"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="contact-page">
      <div className="container contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-description">
            Have questions or need assistance? We're here to help. Contact our team through any of the channels below.
          </p>
        </div>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-card-icon">
              <Phone />
            </div>
            <h3 className="contact-card-title">Phone</h3>
            <p className="contact-card-description">
              Our customer support team is available Monday to Saturday, 8am to 6pm.
            </p>
            <p className="contact-card-value">+237 233 123 456</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">
              <Mail />
            </div>
            <h3 className="contact-card-title">Email</h3>
            <p className="contact-card-description">Send us an email and we'll get back to you within 24 hours.</p>
            <p className="contact-card-value">support@travelease.cm</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">
              <MapPin />
            </div>
            <h3 className="contact-card-title">Office</h3>
            <p className="contact-card-description">Visit our main office in Douala for in-person assistance.</p>
            <p className="contact-card-value">123 Avenue de l'Indépendance, Douala, Cameroon</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="contact-form-container">
            {!formSubmitted ? (
              <>
                <h2 className="contact-form-title">Send us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input type="text" id="name" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input type="email" id="email" className="form-input" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input type="text" id="subject" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea id="message" className="form-textarea" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              <div className="contact-form-success">
                <CheckCircle className="contact-form-success-icon" />
                <h2 className="contact-form-success-title">Message Sent!</h2>
                <p className="contact-form-success-description">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.34620916416!2d9.6867971!3d4.0510564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128340344df9%3A0x58842dbfdbd2c35!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1625764215694!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              title="TravelEase Office Location"
            ></iframe>
          </div>
        </div>

        <div className="contact-faq-section">
          <h2 className="contact-faq-title">Frequently Asked Questions</h2>
          <div className="contact-faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">How do I cancel my booking?</h3>
              <p className="faq-answer">
                You can cancel your booking by going to "My Bookings" in your account, selecting the booking you want to
                cancel, and clicking the "Cancel" button. Cancellations made at least 24 hours before departure are
                eligible for a full refund.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I change my travel date?</h3>
              <p className="faq-answer">
                Yes, you can change your travel date by contacting our customer support team at least 24 hours before
                your scheduled departure. A small fee may apply depending on the fare difference.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How early should I arrive at the bus station?</h3>
              <p className="faq-answer">
                We recommend arriving at the bus station at least 30 minutes before your scheduled departure time to
                allow for check-in and boarding procedures.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What payment methods do you accept?</h3>
              <p className="faq-answer">
                We accept various payment methods including credit/debit cards, mobile money (MTN Mobile Money, Orange
                Money), and bank transfers for online bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

