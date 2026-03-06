export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

export interface BookingDetails {
  eventId: number;
  eventTitle: string;
  tickets: number;
  totalPrice: number;
  userName: string;
  email: string;
}
