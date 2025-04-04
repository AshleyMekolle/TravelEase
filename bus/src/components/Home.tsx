import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faBus,
  faTicketAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useBookingStore } from '../store/BookingStore';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { from, to, date, setFrom, setTo, setDate } = useBookingStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      navigate('/search-results');
    }
  };

  return (
    <div>
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.searchForm}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Find Your Perfect Journey</h1>
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded border focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faCalendarAlt} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 rounded border focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Search Buses
            </button>
          </form>
        </motion.div>
      </section>

      <section className={styles.featuresSection}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TravelEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={styles.feature}
            >
              <FontAwesomeIcon icon={faBus} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comfortable Journey</h3>
              <p className="text-gray-600">Experience comfort with our modern fleet of buses</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={styles.feature}
            >
              <FontAwesomeIcon icon={faTicketAlt} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your tickets in just a few clicks</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={styles.feature}
            >
              <FontAwesomeIcon icon={faClock} className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for your needs</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;