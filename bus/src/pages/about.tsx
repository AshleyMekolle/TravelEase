"use client"

import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Bus, CheckCircle, Clock, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"
import "../styles/about.css"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const teamMembers = [
    {
      name: "Emmanuel Nkwenti",
      position: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emmanuel founded TravelEase with a vision to transform bus travel in Cameroon. With over 15 years in the transportation industry, he brings extensive experience and passion.",
    },
    {
      name: "Marie Atangana",
      position: "Chief Operations Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Marie oversees all operational aspects of TravelEase, ensuring smooth service delivery and customer satisfaction across all routes.",
    },
    {
      name: "Jean-Paul Mbarga",
      position: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Jean-Paul leads our technology initiatives, developing innovative solutions to make bus travel more accessible and convenient for all Cameroonians.",
    },
    {
      name: "Esther Ndom",
      position: "Customer Experience Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Esther ensures that every customer interaction with TravelEase exceeds expectations, from booking to arrival at their destination.",
    },
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="about-hero-content"
            >
              <h1 className="about-hero-title">About TravelEase</h1>
              <p className="about-hero-subtitle">
                Connecting Cameroon with safe, reliable, and comfortable bus travel since 2015
              </p>
              <div className="about-hero-features">
                <div className="about-hero-feature">
                  <CheckCircle className="about-hero-feature-icon" />
                  <span>50+ Routes</span>
                </div>
                <div className="about-hero-feature">
                  <CheckCircle className="about-hero-feature-icon" />
                  <span>100+ Buses</span>
                </div>
                <div className="about-hero-feature">
                  <CheckCircle className="about-hero-feature-icon" />
                  <span>500,000+ Happy Travelers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="about-hero-image-container"
            >
              <div className="about-hero-image">
                <img src="/placeholder.svg?height=400&width=600" alt="TravelEase bus" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="about-section-title" variants={itemVariants}>
              Our Story
            </motion.h2>
            <motion.p className="about-section-subtitle" variants={itemVariants}>
              How we're transforming bus travel in Cameroon
            </motion.p>
          </motion.div>

          <div className="about-story-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="about-story-image-container"
            >
              <div className="about-story-image">
                <img src="/placeholder.svg?height=400&width=600" alt="TravelEase history" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="about-story-content"
            >
              <h3 className="about-story-title">From Humble Beginnings</h3>
              <p className="about-story-text">
                TravelEase was founded in 2015 with just 5 buses and a simple mission: to make bus travel in Cameroon
                safer, more reliable, and more comfortable. Our founder, Emmanuel Nkwenti, experienced firsthand the
                challenges of intercity travel and was determined to create a better solution.
              </p>
              <p className="about-story-text">
                Starting with routes between Douala and Yaoundé, we quickly gained a reputation for punctuality, safety,
                and customer service. As demand grew, so did our fleet and route network.
              </p>
              <p className="about-story-text">
                Today, TravelEase operates over 100 buses serving more than 50 routes across Cameroon, connecting major
                cities and rural communities alike. Our online booking platform has revolutionized how Cameroonians plan
                and book their travel, making the process seamless and stress-free.
              </p>
              <Button className="about-story-button">Learn More About Our Journey</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="about-section-title" variants={itemVariants}>
              Our Values
            </motion.h2>
            <motion.p className="about-section-subtitle" variants={itemVariants}>
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            className="about-values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="about-value-card" variants={itemVariants}>
              <div className="about-value-icon-container">
                <Shield className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Safety First</h3>
              <p className="about-value-text">
                We prioritize the safety of our passengers above all else. Our buses undergo rigorous maintenance, and
                our drivers receive extensive training and regular assessments.
              </p>
            </motion.div>

            <motion.div className="about-value-card" variants={itemVariants}>
              <div className="about-value-icon-container">
                <Clock className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Reliability</h3>
              <p className="about-value-text">
                We understand that our customers depend on us to reach their destinations on time. We maintain strict
                schedules and communicate proactively about any changes.
              </p>
            </motion.div>

            <motion.div className="about-value-card" variants={itemVariants}>
              <div className="about-value-icon-container">
                <Users className="about-value-icon" />
              </div>
              <h3 className="about-value-title">Customer-Centric</h3>
              <p className="about-value-text">
                Every decision we make is with our customers in mind. We continuously seek feedback and make
                improvements to enhance the travel experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="about-team">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="about-section-title" variants={itemVariants}>
              Meet Our Team
            </motion.h2>
            <motion.p className="about-section-subtitle" variants={itemVariants}>
              The dedicated professionals behind TravelEase
            </motion.p>
          </motion.div>

          <motion.div
            className="about-team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="about-team-card">
                  <div className="about-team-image-container">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} className="about-team-image" />
                  </div>
                  <CardContent className="about-team-content">
                    <h3 className="about-team-name">{member.name}</h3>
                    <p className="about-team-position">{member.position}</p>
                    <p className="about-team-bio">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="about-achievements">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="about-section-title" variants={itemVariants}>
              Our Achievements
            </motion.h2>
            <motion.p className="about-section-subtitle" variants={itemVariants}>
              Milestones we've reached along our journey
            </motion.p>
          </motion.div>

          <div className="about-achievements-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="about-achievement"
            >
              <div className="about-achievement-number">500K+</div>
              <p className="about-achievement-text">Passengers Served</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="about-achievement"
            >
              <div className="about-achievement-number">50+</div>
              <p className="about-achievement-text">Routes Across Cameroon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="about-achievement"
            >
              <div className="about-achievement-number">100+</div>
              <p className="about-achievement-text">Modern Buses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="about-achievement"
            >
              <div className="about-achievement-number">4.8/5</div>
              <p className="about-achievement-text">Customer Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="about-cta-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="about-cta-title">Ready to Experience TravelEase?</h2>
            <p className="about-cta-text">
              Join thousands of satisfied travelers who choose TravelEase for their journeys across Cameroon.
            </p>
            <div className="about-cta-buttons">
              <Link to="/search" className="about-cta-button-link">
                <Button className="about-cta-button">
                  <Bus className="about-cta-button-icon" />
                  Book Your Trip
                </Button>
              </Link>
              <Link to="/contact" className="about-cta-button-link">
                <Button variant="outline" className="about-cta-button">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

