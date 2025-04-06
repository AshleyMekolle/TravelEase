"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search, HelpCircle } from "lucide-react"
import "../styles/faq.css"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
            "You can book tickets up to 3 months in advance. We recommend booking early, especially for popular routes or during holiday seasons, to secure your preferred travel date and seat.",
        },
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept various payment methods including credit/debit cards (Visa, Mastercard), mobile money (MTN Mobile Money, Orange Money), and bank transfers. All payments are processed securely.",
        },
      ],
    },
    {
      id: "cancellation",
      title: "Cancellations & Refunds",
      faqs: [
        {
          question: "Can I cancel my booking?",
          answer:
            "Yes, you can cancel your booking through your account on our website or mobile app. Go to 'My Bookings', select the booking you wish to cancel, and follow the cancellation process.",
        },
        {
          question: "What is the refund policy?",
          answer:
            "Refunds depend on when you cancel your booking. Cancellations made at least 24 hours before departure are eligible for a full refund. Cancellations made between 24 and 6 hours before departure receive a 50% refund. Cancellations less than 6 hours before departure are not eligible for a refund.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are typically processed within 7-10 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
        },
      ],
    },
    {
      id: "travel",
      title: "Travel Information",
      faqs: [
        {
          question: "What time should I arrive at the bus station?",
          answer:
            "We recommend arriving at least 30 minutes before your scheduled departure time. This allows sufficient time for check-in, baggage handling, and boarding.",
        },
        {
          question: "How much baggage can I bring?",
          answer:
            "Each passenger is allowed one piece of luggage (up to 20kg) to be stored in the luggage compartment, plus one small carry-on bag. Additional luggage may incur extra charges.",
        },
        {
          question: "Are there restrooms on the bus?",
          answer:
            "Yes, all our long-distance buses are equipped with restrooms. For shorter routes, we make regular comfort stops at clean facilities.",
        },
        {
          question: "Do you provide food and drinks on the bus?",
          answer:
            "Complimentary water is provided on all journeys. On longer routes (4+ hours), we offer a light snack. You're also welcome to bring your own food and non-alcoholic beverages.",
        },
      ],
    },
    {
      id: "services",
      title: "Services & Amenities",
      faqs: [
        {
          question: "Is there Wi-Fi on the bus?",
          answer:
            "Yes, free Wi-Fi is available on all our premium and executive buses. Standard buses do not have Wi-Fi service.",
        },
        {
          question: "Are there power outlets on the bus?",
          answer:
            "Power outlets and USB charging ports are available on our premium and executive buses. Standard buses have limited USB charging ports.",
        },
        {
          question: "Is there entertainment on board?",
          answer:
            "Our premium and executive buses are equipped with individual entertainment systems offering movies, music, and games. Standard buses have shared screens showing general entertainment.",
        },
      ],
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Find answers to common questions about TravelEase services</p>

          <div className="faq-search-container">
            <div className="faq-search-wrapper">
              <Search className="faq-search-icon" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
              {searchQuery && (
                <button className="faq-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="faq-content">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(
              (category) =>
                category.faqs.length > 0 && (
                  <div key={category.id} className="faq-category">
                    <h2 className="faq-category-title">{category.title}</h2>
                    <Accordion type="single" collapsible className="faq-accordion">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`} className="faq-item">
                          <AccordionTrigger className="faq-question">{faq.question}</AccordionTrigger>
                          <AccordionContent className="faq-answer">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ),
            )
          ) : (
            <div className="faq-no-results">
              <HelpCircle className="faq-no-results-icon" />
              <h3 className="faq-no-results-title">No results found</h3>
              <p className="faq-no-results-text">
                We couldn't find any FAQs matching your search. Try different keywords or browse the categories.
              </p>
              <Button onClick={() => setSearchQuery("")} className="faq-no-results-button">
                View all FAQs
              </Button>
            </div>
          )}
        </div>

        <div className="faq-contact">
          <h2 className="faq-contact-title">Still have questions?</h2>
          <p className="faq-contact-text">
            If you couldn't find the answer to your question, our customer support team is here to help.
          </p>
          <div className="faq-contact-buttons">
            <Button className="faq-contact-button">Contact Support</Button>
            <Button variant="outline" className="faq-contact-button">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

