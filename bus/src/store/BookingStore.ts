import { create } from 'zustand';

interface BookingState {
  from: string;
  to: string;
  date: string;
  selectedSeats: string[];
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setDate: (date: string) => void;
  toggleSeat: (seat: string) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  from: '',
  to: '',
  date: '',
  selectedSeats: [],
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setDate: (date) => set({ date }),
  toggleSeat: (seat) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.includes(seat)
        ? state.selectedSeats.filter((s) => s !== seat)
        : [...state.selectedSeats, seat],
    })),
  clearBooking: () => set({ from: '', to: '', date: '', selectedSeats: [] }),
}));