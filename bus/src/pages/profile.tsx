/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { useToast } from "../hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bell, CreditCard, Edit, Eye, EyeOff, Loader2, Lock, LogOut, Save, User } from "lucide-react"
import "../styles/profile.css"

// Define user data interface
interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in by looking for stored user data
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          const user = JSON.parse(storedUser)
          setUserData({
            ...userData,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
          })
          setIsAuthenticated(true)
        } else {
          // Redirect to login if no user data found
          window.location.href = "/auth/login"
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast({
          title: "Error",
          description: "Failed to load user profile data",
          variant: "destructive",
        })
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update user data in local storage
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        const updatedUser = {
          ...user,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Save updated user data
        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Success
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would verify the current password and update with the new one
      // Here we're just simulating the process

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })

      // Reset password fields
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user")
    // Redirect to login page
    window.location.href = "/auth/login"
  }

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="profile-loading">
        <Loader2 className="profile-loading-icon" />
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-grid">
          <div className="profile-sidebar">
            <Card className="profile-sidebar-card">
              <CardContent className="profile-sidebar-content">
                <div className="profile-user-info">
                  <Avatar className="profile-avatar">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>
                      {userData.firstName.charAt(0)}
                      {userData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="profile-user-name">
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="profile-user-email">{userData.email}</p>
                  <Button variant="outline" size="sm" className="profile-change-photo-button">
                    <Edit className="profile-button-icon" />
                    Change Photo
                  </Button>

                  <nav className="profile-nav">
                    <Button variant="ghost" className="profile-nav-button profile-nav-button-active">
                      <User className="profile-nav-icon" />
                      Personal Information
                    </Button>
                    <Button variant="ghost" className="profile-nav-button">
                      <CreditCard className="profile-nav-icon" />
                      Payment Methods
                    </Button>
                    <Button variant="ghost" className="profile-nav-button">
                      <Bell className="profile-nav-icon" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="profile-nav-button">
                      <Lock className="profile-nav-icon" />
                      Security
                    </Button>
                    <Button
                      variant="ghost"
                      className="profile-nav-button profile-nav-button-logout"
                      onClick={handleLogout}
                    >
                      <LogOut className="profile-nav-icon" />
                      Sign Out
                    </Button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="profile-content">
            <Tabs defaultValue="profile" className="profile-tabs">
              <TabsList className="profile-tabs-list">
                <TabsTrigger value="profile" className="profile-tab">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="profile-tab">
                  Security
                </TabsTrigger>
                <TabsTrigger value="preferences" className="profile-tab">
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="profile-tab-content">
                <Card className="profile-card">
                  <CardHeader className="profile-card-header">
                    <CardTitle className="profile-card-title">Personal Information</CardTitle>
                    <CardDescription className="profile-card-description">
                      Update your personal information and contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="profile-card-content">
                    <form onSubmit={handleProfileSubmit} className="profile-form">
                      <div className="profile-form-row">
                        <div className="profile-form-group">
                          <Label htmlFor="firstName" className="profile-form-label">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            required
                            className="profile-form-input"
                          />
                        </div>
                        <div className="profile-form-group">
                          <Label htmlFor="lastName" className="profile-form-label">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            required
                            className="profile-form-input"
                          />
                        </div>
                      </div>

                      <div className="profile-form-group">
                        <Label htmlFor="email" className="profile-form-label">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleChange}
                          required
                          className="profile-form-input"
                        />
                      </div>

                      <div className="profile-form-group">
                        <Label htmlFor="phone" className="profile-form-label">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          required
                          className="profile-form-input"
                        />
                      </div>

                      <div className="profile-form-group">
                        <Label htmlFor="address" className="profile-form-label">
                          Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleChange}
                          className="profile-form-input"
                        />
                      </div>

                      <Button type="submit" disabled={isLoading} className="profile-submit-button">
                        {isLoading ? (
                          <>
                            <Loader2 className="profile-button-icon profile-button-icon-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="profile-button-icon" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="profile-tab-content">
                <Card className="profile-card">
                  <CardHeader className="profile-card-header">
                    <CardTitle className="profile-card-title">Change Password</CardTitle>
                    <CardDescription className="profile-card-description">
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="profile-card-content">
                    <form onSubmit={handlePasswordSubmit} className="profile-form">
                      <div className="profile-form-group">
                        <Label htmlFor="currentPassword" className="profile-form-label">
                          Current Password
                        </Label>
                        <div className="profile-password-input-wrapper">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={userData.currentPassword}
                            onChange={handleChange}
                            required
                            className="profile-form-input"
                          />
                          <button
                            type="button"
                            className="profile-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="profile-form-group">
                        <Label htmlFor="newPassword" className="profile-form-label">
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={userData.newPassword}
                          onChange={handleChange}
                          required
                          className="profile-form-input"
                        />
                      </div>

                      <div className="profile-form-group">
                        <Label htmlFor="confirmPassword" className="profile-form-label">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={userData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="profile-form-input"
                        />
                      </div>

                      <Button type="submit" disabled={isLoading} className="profile-submit-button">
                        {isLoading ? (
                          <>
                            <Loader2 className="profile-button-icon profile-button-icon-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="profile-tab-content">
                <Card className="profile-card">
                  <CardHeader className="profile-card-header">
                    <CardTitle className="profile-card-title">Preferences</CardTitle>
                    <CardDescription className="profile-card-description">
                      Manage your notification and communication preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="profile-card-content">
                    <div className="profile-preferences">
                      <div className="profile-preference-section">
                        <h3 className="profile-preference-title">Email Notifications</h3>
                        <div className="profile-preference-options">
                          <div className="profile-preference-option">
                            <Label htmlFor="booking-confirmation" className="profile-preference-label">
                              Booking confirmations
                            </Label>
                            <input
                              type="checkbox"
                              id="booking-confirmation"
                              defaultChecked
                              className="profile-preference-checkbox"
                            />
                          </div>
                          <div className="profile-preference-option">
                            <Label htmlFor="booking-reminders" className="profile-preference-label">
                              Booking reminders
                            </Label>
                            <input
                              type="checkbox"
                              id="booking-reminders"
                              defaultChecked
                              className="profile-preference-checkbox"
                            />
                          </div>
                          <div className="profile-preference-option">
                            <Label htmlFor="promotions" className="profile-preference-label">
                              Promotions and deals
                            </Label>
                            <input
                              type="checkbox"
                              id="promotions"
                              defaultChecked
                              className="profile-preference-checkbox"
                            />
                          </div>
                          <div className="profile-preference-option">
                            <Label htmlFor="newsletter" className="profile-preference-label">
                              Newsletter
                            </Label>
                            <input type="checkbox" id="newsletter" className="profile-preference-checkbox" />
                          </div>
                        </div>
                      </div>

                      <div className="profile-preference-section">
                        <h3 className="profile-preference-title">SMS Notifications</h3>
                        <div className="profile-preference-options">
                          <div className="profile-preference-option">
                            <Label htmlFor="sms-booking" className="profile-preference-label">
                              Booking confirmations
                            </Label>
                            <input
                              type="checkbox"
                              id="sms-booking"
                              defaultChecked
                              className="profile-preference-checkbox"
                            />
                          </div>
                          <div className="profile-preference-option">
                            <Label htmlFor="sms-reminders" className="profile-preference-label">
                              Booking reminders
                            </Label>
                            <input
                              type="checkbox"
                              id="sms-reminders"
                              defaultChecked
                              className="profile-preference-checkbox"
                            />
                          </div>
                          <div className="profile-preference-option">
                            <Label htmlFor="sms-promotions" className="profile-preference-label">
                              Promotions and deals
                            </Label>
                            <input type="checkbox" id="sms-promotions" className="profile-preference-checkbox" />
                          </div>
                        </div>
                      </div>

                      <Button className="profile-preferences-button">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

