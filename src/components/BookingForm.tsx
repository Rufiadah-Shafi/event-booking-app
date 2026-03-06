"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setBooking } from "@/store/bookingSlice";
import { Event } from "@/types";

interface BookingFormProps {
  event: Event;
}

export default function BookingForm({ event }: BookingFormProps) {
  const [tickets, setTickets] = useState(1);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(
      setBooking({
        eventId: event.id,
        eventTitle: event.title,
        tickets,
        totalPrice: tickets * event.price,
        userName,
        email,
      })
    );
    setTimeout(() => router.push("/booking-summary"), 400);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5">
        <h3 className="text-lg font-bold text-white">Book Your Tickets</h3>
        <p className="text-indigo-100 text-sm mt-0.5">Secure your spot now</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Tickets */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Number of Tickets
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTickets(Math.max(1, tickets - 1))}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all active:scale-95"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={event.availableSeats}
              value={tickets}
              onChange={(e) => setTickets(Math.max(1, Math.min(event.availableSeats, Number(e.target.value))))}
              className="flex-1 text-center text-lg font-bold border border-gray-200 rounded-xl px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setTickets(Math.min(event.availableSeats, tickets + 1))}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all active:scale-95"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{event.availableSeats} seats available</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John Doe"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow outline-none"
            required
          />
        </div>

        {/* Price breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>${event.price.toFixed(2)} x {tickets} ticket{tickets > 1 ? "s" : ""}</span>
            <span>${(tickets * event.price).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ${(tickets * event.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-indigo-200"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </form>
  );
}
