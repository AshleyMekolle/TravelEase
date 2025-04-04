"use client"

import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Bus, CheckCircle, Clock, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">About TravelEase</h1>
              <p className="text-lg opacity-90 mb-6">
                Connecting Cameroon with safe, reliable, and comfortable bus travel since 2015
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>50+ Routes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>100+ Buses</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>500,000+ Happy Travelers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="TravelEase bus"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" variants={itemVariants}>
              Our Story
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              How we're transforming bus travel in Cameroon
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="TravelEase history"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">From Humble Beginnings</h3>
              <p className="text-muted-foreground mb-4">
                TravelEase was founded in 2015 with just 5 buses and a simple mission: to make bus travel in Cameroon
                safer, more reliable, and more comfortable. Our founder, Emmanuel Nkwenti, experienced firsthand the
                challenges of intercity travel and was determined to create a better solution.
              </p>
              <p className="text-muted-foreground mb-4">
                Starting with routes between Douala and Yaoundé, we quickly gained a reputation for punctuality, safety,
                and customer service. As demand grew, so did our fleet and route network.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, TravelEase operates over 100 buses serving more than 50 routes across Cameroon, connecting major
                cities and rural communities alike. Our online booking platform has revolutionized how Cameroonians plan
                and book their travel, making the process seamless and stress-free.
              </p>
              <Button>Learn More About Our Journey</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" variants={itemVariants}>
              Our Values
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="bg-background rounded-xl p-6 shadow-sm border border-border" variants={itemVariants}>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-muted-foreground">
                We prioritize the safety of our passengers above all else. Our buses undergo rigorous maintenance, and
                our drivers receive extensive training and regular assessments.
              </p>
            </motion.div>

            <motion.div className="bg-background rounded-xl p-6 shadow-sm border border-border" variants={itemVariants}>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-muted-foreground">
                We understand that our customers depend on us to reach their destinations on time. We maintain strict
                schedules and communicate proactively about any changes.
              </p>
            </motion.div>

            <motion.div className="bg-background rounded-xl p-6 shadow-sm border border-border" variants={itemVariants}>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
              <p className="text-muted-foreground">
                Every decision we make is with our customers in mind. We continuously seek feedback and make
                improvements to enhance the travel experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" variants={itemVariants}>
              Meet Our Team
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground" variants={itemVariants}>
              The dedicated professionals behind TravelEase
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card>
                  <div className="relative h-[300px]">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" variants={itemVariants}>
              Our Achievements
            </motion.h2>
            <motion.p className="text-lg opacity-90" variants={itemVariants}>
              Milestones we've reached along our journey
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">500K+</div>
              <p className="text-lg">Passengers Served</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-lg">Routes Across Cameroon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-lg">Modern Buses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <p className="text-lg">Customer Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Experience TravelEase?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied travelers who choose TravelEase for their journeys across Cameroon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button size="lg">
                  <Bus className="mr-2 h-5 w-5" />
                  Book Your Trip
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
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

