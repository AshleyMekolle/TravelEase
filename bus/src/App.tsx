import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Layout from "./components/layout"
import LoadingScreen from "./components/Loading"
import './styles/global.css'

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/home"))
const SearchPage = lazy(() => import("./pages/search"))
const SelectSeatPage = lazy(() => import("./pages/select-seat"))
const BookingsPage = lazy(() => import("./pages/bookings"))
const ContactPage = lazy(() => import("./pages/contact"))
const LoginPage = lazy(() => import("./pages/auth/login"))
const SignupPage = lazy(() => import("./pages/auth/signup"))
const ForgotPasswordPage = lazy(() => import("./pages/auth/forgot-password"))
const PaymentPage = lazy(() => import("./pages/payment"))
const BookingConfirmationPage = lazy(() => import("./pages/bookingConfirmation"))
const ProfilePage = lazy(() => import("./pages/profile"))
const RoutesPage = lazy(() => import("./pages/routes"))
const AboutPage = lazy(() => import("./pages/about"))
const FaqPage = lazy(() => import("./pages/faq"))

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        {/* Routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="select-seat/:id" element={<SelectSeatPage />} />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="booking-confirmation/:id" element={<BookingConfirmationPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

