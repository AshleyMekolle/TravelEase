"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bus, Eye, EyeOff, Lock, Mail } from "lucide-react"
import "../../styles/auth.css"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
  
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    const form = e.currentTarget
  
    localStorage.setItem(
      "travelease-user",
      JSON.stringify({
        name: "John Doe",
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
      }),
    )
  
    setIsLoading(false)
    navigate("/")
  }
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <Bus className="auth-logo-icon" />
              <span className="auth-logo-text">TravelEase</span>
            </Link>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-description">Sign in to your account to continue</p>
          </div>

          <div className="auth-content">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="form-input-wrapper">
                  <Mail className="form-input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input form-input-with-icon"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Link to="/auth/forgot-password" className="form-label-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-input form-input-with-icon"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="form-input-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="form-button-icon" /> : <Eye className="form-button-icon" />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-checkbox-group">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="form-checkbox-label">Remember me</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="form-button-icon form-button-icon-spin">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray="32"
                          strokeDashoffset="10"
                        />
                      </svg>
                    </span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <div className="auth-social">
              <button className="btn btn-outline auth-social-button">
                <svg className="auth-social-icon" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="auth-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

