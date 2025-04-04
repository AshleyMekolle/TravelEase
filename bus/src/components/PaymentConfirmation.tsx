import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/PaymentConfirmation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faTicketAlt, 
  faMapMarkerAlt, 
  faCalendarAlt, 
  faUsers, 
  faCouch,
  faDownload,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { IBooking, IPassenger } from '../types';
import { Link } from 'react-router-dom';

interface PaymentConfirmationProps {
  booking: IBooking;
  paymentId: string;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ booking, paymentId }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleDownloadTicket = () => {
    // Implement PDF download functionality here
    alert('Ticket download functionality will be implemented soon.');
  };
  
  const handleShareTicket = () => {
    // Implement share functionality here
    if (navigator.share) {
      navigator.share({
        title: 'TravelEase Bus Ticket',
        text: `Bus ticket from ${booking.source} to ${booking.destination} on ${formatDate(booking.journeyDate)}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };
  
  return (
    <motion.div 
      className={styles.confirmationContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.successHeader}>
        <FontAwesomeIcon icon={faCheckCircle} className={styles.successIcon} />
        <h2>Payment Successful!</h2>
        <p>Your booking has been confirmed</p>
      </div>
      
      <div className={styles.ticketContainer}>
        <div className={styles.ticketHeader}>
          <div className={styles.logoSection}>
            <h3>TravelEase</h3>
            <span>Bus Ticket</span>
          </div>
          <div className={styles.ticketNumber}>
            <FontAwesomeIcon icon={faTicketAlt} />
            <span>#{booking.id?.slice(-8).toUpperCase()}</span>
          </div>
        </div>
        
        <div className={styles.journeyDetails}>
          <div className={styles.journeyRoute}>
            <div className={styles.locationBox}>
              <p className={styles.location}>{booking.source}</p>
              <p className={styles.time}>{formatTime(booking.departureTime)}</p>
            </div>
            
            <div className={styles.journeyLine}>
              <div className={styles.dot}></div>
              <div className={styles.line}></div>
              <div className={styles.dot}></div>
            </div>
            
            <div className={styles.locationBox}>
              <p className={styles.location}>{booking.destination}</p>
              <p className={styles.time}>{formatTime(booking.arrivalTime)}</p>
            </div>
          </div>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.detailIcon} />
              <div>
                <p className={styles.detailLabel}>Date</p>
                <p className={styles.detailValue}>{formatDate(booking.journeyDate)}</p>
              </div>
            </div>
            
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faUsers} className={styles.detailIcon} />
              <div>
                <p className={styles.detailLabel}>Passengers</p>
                <p className={styles.detailValue}>{booking.passengers.length}</p>
              </div>
            </div>
            
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faCouch} className={styles.detailIcon} />
              <div>
                <p className={styles.detailLabel}>Seats</p>
                <p className={styles.detailValue}>{booking.selectedSeats.join(', ')}</p>
              </div>
            </div>
            
            <div className={styles.detailItem}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.detailIcon} />
              <div>
                <p className={styles.detailLabel}>Bus Type</p>
                <p className={styles.detailValue}>{booking.busType}</p>
              </div>
            </div>
          </div>
        </div>
        
            <div className={styles.passengerInfo}>
            <h4>Passenger Information</h4>
            {booking.passengers.map((passenger: IPassenger, index: number) => (
            <div key={index} className={styles.passenger}>
            <p className={styles.passengerName}>{passenger.name}</p>
            <p className={styles.passengerDetails}>
            {passenger.age} yrs • {passenger.gender}
            </p>
            </div>
            ))}
            </div>
        
        <div className={styles.paymentInfo}>
          <div className={styles.paymentRow}>
            <span>Payment ID</span>
            <span>{paymentId}</span>
          </div>
          <div className={styles.paymentRow}>
            <span>Amount Paid</span>
            <span className={styles.amount}>₹{booking.totalAmount}</span>
          </div>
        </div>
        
        <div className={styles.barcodeSection}>
          <div className={styles.barcode}>
            {/* Barcode image would go here in a real implementation */}
            <div className={styles.dummyBarcode}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        <button className={styles.downloadButton} onClick={handleDownloadTicket}>
          <FontAwesomeIcon icon={faDownload} />
          Download Ticket
        </button>
        <button className={styles.shareButton} onClick={handleShareTicket}>
          <FontAwesomeIcon icon={faShareAlt} />
          Share
        </button>
      </div>
      
      <div className={styles.nextActions}>
        <Link to="/" className={styles.homeButton}>
          Back to Home
        </Link>
        <Link to="/bookings" className={styles.viewBookingsButton}>
          View All Bookings
        </Link>
      </div>
    </motion.div>
  );
};

export default PaymentConfirmation;