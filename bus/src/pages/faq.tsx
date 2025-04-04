"use client"

import { useState } from "react"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({})

  const faqCategories = [
    {
      id: "booking",
      title: "Booking & Tickets",
      faqs: [
        {
          question: "How do I book a ticket?",
          answer:
            "You can book a ticket online through our website or mobile app. Simply select your departure and arrival cities, choose your travel date, select the number of passengers, and follow the prompts to complete your booking.",
        },
        {
          question: "Can I book a ticket for someone else?",
          answer:
            "Yes, you can book tickets for other passengers. During the booking process, you'll be asked to provide the passenger details. Make sure to enter the correct information for each passenger.",
        },
        {
          question: "How far in advance can I book a ticket?",
          answer:
            "Tickets are typically available for booking up to 3 months in advance. For special routes or seasonal services, booking may open earlier. Check our website for specific route availability.",
        },
        {
          question: "Is there a booking fee?",
          answer:
            "We charge a small convenience fee for online bookings. This fee varies depending on the route and payment method. The exact fee will be displayed before you confirm your booking.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Options",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit/debit cards, net banking, UPI, and popular mobile wallets. Some routes may also offer cash payment options on board.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption to protect your payment information. We don't store your credit card details on our servers.",
        },
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation & Refunds",
      faqs: [
        {
          question: "How do I cancel my ticket?",
          answer:
            "You can cancel your ticket through the 'My Bookings' section on our website or app. Cancellations are also accepted at our customer service centers.",
        },
        {
          question: "What is your refund policy?",
          answer:
            "Refunds depend on when you cancel. Cancellations made more than 24 hours before departure receive a full refund minus a processing fee. Later cancellations may receive partial refunds or none, depending on the route.",
        },
      ],
    },
  ]

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }))
  }

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tabs">
        {faqCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {filteredCategories
          .filter(category => activeCategory ? category.id === activeCategory : true)
          .map(category => (
            <div key={category.id} className="category-section">
              <h2 className="category-title">{category.title}</h2>
              {category.faqs.map((faq, index) => {
                const faqId = `${category.id}-${index}`
                return (
                  <div key={faqId} className="faq-item">
                    <button
                      onClick={() => toggleFaq(faqId)}
                      className="faq-question"
                    >
                      {faq.question}
                      <span className="toggle-icon">
                        {expandedFaqs[faqId] ? '−' : '+'}
                      </span>
                    </button>
                    {expandedFaqs[faqId] && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))
        }
      </div>
    </div>
  )
}