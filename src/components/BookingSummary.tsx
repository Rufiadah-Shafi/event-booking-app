"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function BookingSummary() {
  const { booking } = useAppSelector((state) => state.booking);

  if (!booking) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-900">No booking found</p>
        <p className="text-sm text-gray-500 mt-1">Book an event to see your summary here</p>
        <Link
          href="/events"
          className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mb-5 shadow-lg shadow-green-200">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mt-2">
          Your tickets have been reserved successfully
        </p>
      </div>

      {/* Ticket card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-6 border-b border-dashed border-gray-200">
            {booking.eventTitle}
          </h2>

          <div className="space-y-5">
            <SummaryRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h20" /></svg>}
              label="Tickets"
              value={`${booking.tickets} ticket${booking.tickets > 1 ? "s" : ""}`}
            />
            <SummaryRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
              label="Total Price"
              value={`$${booking.totalPrice.toFixed(2)}`}
              highlight
            />
            <SummaryRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
              label="Name"
              value={booking.userName}
            />
            <SummaryRow
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
              label="Email"
              value={booking.email}
            />
          </div>
        </div>

        <div className="px-8 pb-8">
          <Link
            href="/events"
            className="block text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-indigo-200"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className={`font-semibold ${highlight ? "text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" : "text-sm text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}
