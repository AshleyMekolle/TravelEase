/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../hooks/use-toast"
import { Bus, CheckCircle, Loader2 } from "lucide-react"
import "../../styles/forgot-password.css"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      setSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was a problem sending the reset link.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="forgot-password-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="forgot-password-container"
      >
        <div className="forgot-password-logo-container">
          <Link to="/" className="forgot-password-logo">
            <Bus className="forgot-password-logo-icon" />
            <span className="forgot-password-logo-text">TravelEase</span>
          </Link>
        </div>

        <Card className="forgot-password-card">
          <CardHeader className="forgot-password-header">
            <CardTitle className="forgot-password-title">Reset your password</CardTitle>
            <CardDescription className="forgot-password-description">
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="forgot-password-content">
            {submitted ? (
              <div className="forgot-password-success">
                <CheckCircle className="forgot-password-success-icon" />
                <h3 className="forgot-password-success-title">Check your email</h3>
                <p className="forgot-password-success-text">
                  We've sent a password reset link to <span className="forgot-password-email">{email}</span>
                </p>
                <p className="forgot-password-success-help">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button className="forgot-password-try-again" onClick={() => setSubmitted(false)}>
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="forgot-password-form-group">
                  <Label htmlFor="email" className="forgot-password-label">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="forgot-password-input"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="forgot-password-button">
                  {isLoading ? (
                    <>
                      <Loader2 className="forgot-password-button-icon forgot-password-button-icon-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="forgot-password-footer">
            <p className="forgot-password-footer-text">
              Remember your password?{" "}
              <Link to="/auth/login" className="forgot-password-link">
                Back to login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

