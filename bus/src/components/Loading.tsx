"use client"

import { motion } from "framer-motion"
import { Bus } from "lucide-react"
import "./LoadingScreen.css"

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: ["-100%", "100vw"],
          opacity: 1,
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "linear",
        }}
        className="bus-animation"
      >
        <Bus className="bus-icon" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="loading-text"
      >
        <h1>TravelEase</h1>
        <p>Loading your journey...</p>
      </motion.div>

      <motion.div className="progress-container">
        <motion.div
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </div>
  )
}