// src/types/bus.types.ts
export interface IBusRoute {
    id: string;
    from: string;
    to: string;
    distance: number;
    duration: string;
    popularRoute: boolean;
  }
  
  export interface IBus {
    id: string;
    name: string;
    busNumber: string;
    busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper';
    totalSeats: number;
    amenities: string[];
    rating: number;
    price: number;
  }
  
  export interface ISeat {
    id: string;
    number: string;
    type: 'window' | 'aisle' | 'sleeper';
    price: number;
    isAvailable: boolean;
    isSelected?: boolean;
    gender?: 'male' | 'female' | null;
  }
  
  export interface IBusSchedule {
    id: string;
    busId: string;
    routeId: string;
    departureTime: string;
    arrivalTime: string;
    date: string;
    availableSeats: number;
    fare: {
      basePrice: number;
      tax: number;
      serviceCharge: number;
      totalFare: number;
    };
    seats: ISeat[];
  }
  
  // src/types/booking.types.ts
  export interface IPassenger {
    id?: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    seatId: string;
    seatNumber: string;
  }

  export interface IBooking {
    source: string;
    destination: string;
    journeyDate: string;
    departureTime: string;
    arrivalTime: string;
    selectedSeats: ISeat[];
    busType: 'AC' | 'Non-AC' | 'Sleeper' | 'Semi-Sleeper'; // or ReactNode if needed
    id?: string;
    scheduleId: string;
    userId?: string;
    passengers: IPassenger[];
    totalAmount: number;
    bookingDate: string;
    bookingStatus: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed';
    contactDetails: {
      email: string;
      phone: string;
    };
  }
  
  // src/types/user.types.ts
  export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    bookings?: string[];
  }
  
  export interface ISearchParams {
    from: string;
    to: string;
    date: string;
    passengers: number;
  }