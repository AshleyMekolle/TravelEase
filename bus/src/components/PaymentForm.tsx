// src/components/Payment/PaymentForm/PaymentForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/PymentForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faLock, 
  faShieldAlt, 
  faUser, 
  faCalendarAlt, 
} from '@fortawesome/free-solid-svg-icons';
import { IBooking } from '../types';

interface PaymentFormProps {
  booking: IBooking;
  onPaymentComplete: (paymentId: string, bookingId: string) => void;
}

interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

interface FormErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onPaymentComplete }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<string>('card');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Format card number with spaces after every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19); // Limit to 16 digits + 3 spaces
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Handle other inputs
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Validate cardholder name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    // Validate card number
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits || cardNumberDigits.length !== 16 || !/^\d+$/.test(cardNumberDigits)) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }
    
    // Validate expiry date
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryPattern.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
    } else {
      // Check if card is expired
      const [month, year] = formData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      
      if (expiryDate < today) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVV
    if (!formData.cvv || formData.cvv.length < 3 || !/^\d+$/.test(formData.cvv)) {
      newErrors.cvv = 'Enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate random payment ID
      const paymentId = `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      onPaymentComplete(paymentId, booking.id || '');
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };
  
  const calculateTotal = () => {
    return booking.totalAmount;
  };
  
  return (
    <div className={styles.paymentFormContainer}>
      <h2>Payment Details</h2>
      
      <div className={styles.paymentMethods}>
        <div 
          className={`${styles.paymentMethod} ${activePaymentMethod === 'card' ? styles.active : ''}`}
          onClick={() => setActivePaymentMethod('card')}
        >
          <FontAwesomeIcon icon={faCreditCard} />
          <span>Credit/Debit Card</span>
        </div>
        <div 
          className={`${styles.paymentMethod} ${activePaymentMethod === 'upi' ? styles.active : ''}`}
          onClick={() => setActivePaymentMethod('upi')}
        >
          <span>UPI</span>
        </div>
        <div 
          className={`${styles.paymentMethod} ${activePaymentMethod === 'netbanking' ? styles.active : ''}`}
          onClick={() => setActivePaymentMethod('netbanking')}
        >
          <span>Net Banking</span>
        </div>
      </div>
      
      {activePaymentMethod === 'card' && (
        <motion.form 
          onSubmit={handleSubmit}
          className={styles.paymentForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="cardholderName">
              <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              className={errors.cardholderName ? styles.inputError : ''}
              placeholder="John Doe"
              disabled={isProcessing}
            />
            {errors.cardholderName && (
              <span className={styles.errorText}>{errors.cardholderName}</span>
            )}
          </div>
          
          <div className={styles.formGroup}>
          // Continuation of PaymentForm.tsx
            <label htmlFor="cardNumber">
              <FontAwesomeIcon icon={faCreditCard} className={styles.inputIcon} />
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className={errors.cardNumber ? styles.inputError : ''}
              placeholder="1234 5678 9012 3456"
              disabled={isProcessing}
              maxLength={19}
            />
            {errors.cardNumber && (
              <span className={styles.errorText}>{errors.cardNumber}</span>
            )}
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expiryDate">
                <FontAwesomeIcon icon={faCalendarAlt} className={styles.inputIcon} />
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className={errors.expiryDate ? styles.inputError : ''}
                placeholder="MM/YY"
                disabled={isProcessing}
                maxLength={5}
              />
              {errors.expiryDate && (
                <span className={styles.errorText}>{errors.expiryDate}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="cvv">
                <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                className={errors.cvv ? styles.inputError : ''}
                placeholder="123"
                disabled={isProcessing}
                maxLength={4}
              />
              {errors.cvv && (
                <span className={styles.errorText}>{errors.cvv}</span>
              )}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.saveCardOption}>
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleInputChange}
                disabled={isProcessing}
              />
              <label htmlFor="saveCard">
                Save card details for future bookings
              </label>
            </div>
          </div>
          
          <div className={styles.securityNote}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.securityIcon} />
            <p>
              Your payment information is encrypted and secure. We use 
              industry-standard security measures to protect your data.
            </p>
          </div>
          
          <div className={styles.bookingSummary}>
            <h3>Booking Summary</h3>
            <div className={styles.summaryRow}>
              <span>Travel Date</span>
              <span>{new Date(booking.journeyDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>From - To</span>
              <span>{booking.source} - {booking.destination}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Passengers</span>
              <span>{booking.passengers.length}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Seats</span>
              <span>{booking.selectedSeats.join(', ')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Bus Type</span>
              <span>{booking.busType}</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={`${styles.summaryRow} ${styles.totalAmount}`}>
              <span>Total Amount</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={styles.paymentButton}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faLock} />
                Pay ₹{calculateTotal()}
              </>
            )}
          </button>
        </motion.form>
      )}
      
      {activePaymentMethod === 'upi' && (
        <motion.div 
          className={styles.alternativePaymentMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>UPI payment method is coming soon. Please use card payment for now.</p>
        </motion.div>
      )}
      
      {activePaymentMethod === 'netbanking' && (
        <motion.div 
          className={styles.alternativePaymentMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Net Banking payment method is coming soon. Please use card payment for now.</p>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentForm;