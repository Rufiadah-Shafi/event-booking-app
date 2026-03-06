# EventBook — Event Booking Application

A full-featured desktop event booking app built with Next.js, React, TypeScript, and Redux Toolkit.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation & Run

git clone https://github.com/Rufiadah-Shafi/event-booking-app.git
cd event-booking-app
npm install
npm run dev

Open http://localhost:3000 in your browser.

---

## Project Structure

src/
├── app/
│   ├── layout.tsx              # Root layout with Redux provider + Navbar
│   ├── page.tsx                # Redirects / to /events
│   ├── globals.css             # Global styles
│   ├── events/
│   │   ├── page.tsx            # /events — Event listing page
│   │   └── [id]/page.tsx       # /events/[id] — Event details page
│   └── booking-summary/
│       └── page.tsx            # /booking-summary — Booking confirmation
├── components/
│   ├── Providers.tsx
│   ├── EventCard.tsx
│   ├── EventList.tsx
│   ├── EventDetails.tsx
│   ├── BookingForm.tsx
│   └── BookingSummary.tsx
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   └── eventsSlice.ts
│   └── bookingSlice.ts
├── lib/
│   └── transformEvents.ts
└── types/
    └── index.ts

---

## Architecture Decisions

### 1. Next.js App Router
Used the App Router for file-based routing. Server components are used where possible, with "use client" only where interactivity is needed.

### 2. Redux Toolkit for State Management
- eventsSlice manages event list, selected event, loading and error states using createAsyncThunk for the API call.
- bookingSlice manages booking details persisted until user returns to events.
- Typed hooks ensure full TypeScript safety.

### 3. List Virtualization (react-window)
FixedSizeList from react-window only renders visible rows in the DOM, keeping performance optimal for 100+ events.

### 4. Data Transformation Layer
JSONPlaceholder /posts data is transformed into rich Event objects with dates, locations, prices, and categories. Keeps API logic isolated from UI components.

### 5. TypeScript Throughout
All components, state slices, and utilities are fully typed via shared interfaces in types/index.ts.

---

## Features

- Event Listing Page with 100 events
- List virtualization with react-window
- Event Details Page (title, description, date, location, price, seats)
- Booking Form with validation
- Booking Summary Page
- Redux Toolkit state management
- Next.js routing (/events, /events/[id], /booking-summary)
- TypeScript throughout
- Clean, modern desktop UI