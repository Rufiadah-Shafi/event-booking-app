"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEvents } from "@/store/eventsSlice";
import EventCard from "./EventCard";

const ROW_HEIGHT = 160;
const COLS = 3;
const OVERSCAN = 3;

export default function EventList() {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(800);

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerHeight(el.clientHeight);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <div className="mb-10">
          <div className="skeleton h-10 w-64 mb-3" />
          <div className="skeleton h-5 w-96" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="skeleton h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900">Something went wrong</p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
      </div>
    );
  }

  const totalRows = Math.ceil(events.length / COLS);
  const totalHeight = totalRows * ROW_HEIGHT;
  const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endRow = Math.min(
    totalRows,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN
  );

  const visibleItems = [];
  for (let row = startRow; row < endRow; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col;
      if (index >= events.length) break;
      visibleItems.push(
        <div
          key={events[index].id}
          style={{
            position: "absolute",
            top: row * ROW_HEIGHT,
            left: `${(col / COLS) * 100}%`,
            width: `${100 / COLS}%`,
            height: ROW_HEIGHT,
          }}
        >
          <EventCard event={events[index]} />
        </div>
      );
    }
  }

  return (
    <div className="animate-fade-in-up">
      {/* Hero header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Discover Events
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Browse {events.length} upcoming events and book your spot
        </p>
      </div>

      {/* Virtualized grid */}
      <div
        ref={containerRef}
        className="rounded-2xl"
        style={{ height: "calc(100vh - 220px)", overflow: "auto", position: "relative" }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
}
