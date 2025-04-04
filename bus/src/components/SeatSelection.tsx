/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/BookingStore';

const SeatSelection: React.FC = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat } = useBookingStore();

  const totalSeats = 36;
  const rows = 9;
  const seatsPerRow = 4;

  const renderSeat = (seatNumber: number) => {
    const seatId = `${seatNumber}`;
    const isSelected = selectedSeats.includes(seatId);

    return (
      <motion.button
        key={seatId}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleSeat(seatId)}
        className={`w-12 h-12 rounded-lg m-1 ${
          isSelected
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        {seatNumber}
      </motion.button>
    );
  };

  const renderRow = (rowIndex: number) => {
    const seats = [];
    for (let i = 0; i < seatsPerRow; i++) {
      const seatNumber = rowIndex * seatsPerRow + i + 1;
      if (seatNumber <= totalSeats) {
        seats.push(renderSeat(seatNumber));
      }
    }
    return (
      <div key={rowIndex} className="flex justify-center gap-8">
        {seats.slice(0, 2)}
        <div className="w-8" /> {/* Aisle */}
        {seats.slice(2)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Select Your Seats</h2>
          
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded mr-2" />
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded mr-2" />
                <span>Selected</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-gray-800 text-white px-8 py-1 rounded">
              Front
            </div>
            <div className="space-y-4">
              {Array.from({ length: rows }, (_, i) => renderRow(i))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4">
              Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </p>
            <button
              onClick={() => navigate('/checkout')}
              disabled={selectedSeats.length === 0}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition-colors"
            >
              Continue to Checkout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelection;