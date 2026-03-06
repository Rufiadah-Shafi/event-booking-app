import Link from "next/link";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

const colorSchemes = [
  { bg: "from-indigo-500 to-blue-600", light: "bg-indigo-50 text-indigo-700" },
  { bg: "from-purple-500 to-pink-600", light: "bg-purple-50 text-purple-700" },
  { bg: "from-emerald-500 to-teal-600", light: "bg-emerald-50 text-emerald-700" },
  { bg: "from-orange-500 to-red-500", light: "bg-orange-50 text-orange-700" },
  { bg: "from-cyan-500 to-blue-500", light: "bg-cyan-50 text-cyan-700" },
];

export default function EventCard({ event }: EventCardProps) {
  const scheme = colorSchemes[event.id % colorSchemes.length];
  const month = new Date(event.date).toLocaleString("default", { month: "short" });
  const day = new Date(event.date).getDate();

  return (
    <div className="h-full px-2 pb-4">
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden border border-gray-100 hover:border-transparent hover:-translate-y-1">
        {/* Gradient accent bar */}
        <div className={`h-1.5 bg-gradient-to-r ${scheme.bg}`} />

        <div className="p-5 flex gap-4">
          {/* Date badge */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300">
            <span className="text-[10px] font-bold uppercase text-gray-400 leading-none">{month}</span>
            <span className="text-lg font-bold text-gray-800 leading-tight">{day}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
              {event.title}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scheme.light}`}>
                ${event.price.toFixed(0)}
              </span>
              <Link
                href={`/events/${event.id}`}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full text-white bg-gradient-to-r ${scheme.bg} opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
