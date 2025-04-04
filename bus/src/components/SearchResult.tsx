import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faClock, faCoins } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/BookingStore';

const mockBuses = [
  {
    id: 1,
    name: 'Express Deluxe',
    departure: '08:00 AM',
    arrival: '02:00 PM',
    price: 45,
    seats: 32,
  },
  {
    id: 2,
    name: 'Premium Coach',
    departure: '10:30 AM',
    arrival: '04:30 PM',
    price: 55,
    seats: 28,
  },
  {
    id: 3,
    name: 'Night Rider',
    departure: '11:00 PM',
    arrival: '05:00 AM',
    price: 40,
    seats: 36,
  },
];

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const { from, to, date } = useBookingStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Buses from {from} to {to}
          </h2>
          <p className="text-gray-600">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="space-y-4">
          {mockBuses.map((bus) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon
                      icon={faBus}
                      className="text-blue-600 mr-2"
                    />
                    <h3 className="text-xl font-semibold">{bus.name}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4 md:mb-0">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2"
                    />
                    <span>
                      {bus.departure} - {bus.arrival}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCoins}
                      className="text-yellow-500 mr-2"
                    />
                    <span className="text-2xl font-bold">${bus.price}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/select-seats/${bus.id}`)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;