"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEvents, selectEvent } from "@/store/eventsSlice";
import BookingForm from "./BookingForm";

const colorSchemes = [
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
];

interface EventDetailsProps {
  eventId: number;
}

export default function EventDetails({ eventId }: EventDetailsProps) {
  const dispatch = useAppDispatch();
  const { selectedEvent, events, loading } = useAppSelector(
    (state) => state.events
  );

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    } else {
      dispatch(selectEvent(eventId));
    }
  }, [dispatch, eventId, events.length]);

  useEffect(() => {
    if (events.length > 0) {
      dispatch(selectEvent(eventId));
    }
  }, [dispatch, eventId, events]);

  if (loading) {
    return (
      <div className="animate-fade-in-up space-y-6">
        <div className="skeleton h-6 w-32" />
        <div className="skeleton h-48 rounded-2xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!selectedEvent) {
    return (
      <div className="flex flex-col justify-center items-center h-64 animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900">Event not found</p>
        <Link href="/events" className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          Back to events
        </Link>
      </div>
    );
  }

  const gradient = colorSchemes[selectedEvent.id % colorSchemes.length];
  const month = new Date(selectedEvent.date).toLocaleString("default", { month: "long" });
  const day = new Date(selectedEvent.date).getDate();
  const year = new Date(selectedEvent.date).getFullYear();

  return (
    <div className="animate-fade-in-up">
      {/* Back link */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main content - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {/* Hero banner */}
          <div className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {month} {day}, {year}
              </div>
              <h1 className="text-3xl font-extrabold leading-tight">
                {selectedEvent.title}
              </h1>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About this event</h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {selectedEvent.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                label="Location"
                value={selectedEvent.location}
              />
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                label="Date"
                value={`${month} ${day}, ${year}`}
              />
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
                label="Ticket Price"
                value={`$${selectedEvent.price.toFixed(2)}`}
              />
              <InfoCard
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                label="Available Seats"
                value={`${selectedEvent.availableSeats} seats`}
              />
            </div>
          </div>
        </div>

        {/* Booking sidebar - 2 cols */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <BookingForm event={selectedEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 group">
      <div className="text-gray-400 group-hover:text-indigo-500 transition-colors mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
