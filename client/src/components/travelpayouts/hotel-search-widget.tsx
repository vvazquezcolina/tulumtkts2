import { useState } from "react";
import { Hotel, Search, Calendar, Users } from "lucide-react";
import { generateHotelLink, trackAffiliateClick } from "@/lib/affiliate";

export interface HotelSearchWidgetProps {
  /** Pre-fill the destination. Free-form (city name) — Hotellook resolves it. */
  destination?: string;
  className?: string;
}

/**
 * Quick-launcher card for Hotellook hotel search. Originally an iframe widget
 * loaded from `c121.travelpayouts.com`, which requires a per-account hash from
 * the TP dashboard (returns HTTP 400 without it). This is a React-rendered
 * equivalent that uses our `generateHotelLink` (Hotellook URL with `?marker=`
 * injected — verified to redirect through TP and land on Booking.com with the
 * marker tracked) so visitors get a real CTA rather than a blank widget host.
 */
export function HotelSearchWidget({
  destination = "Tulum",
  className = "",
}: HotelSearchWidgetProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");

  const handleSearch = () => {
    const url = generateHotelLink(destination, checkIn || undefined, checkOut || undefined);
    const tracked = adults !== "2" ? `${url}&adults=${adults}` : url;
    trackAffiliateClick("hotellook", `Hoteles ${destination}`, "0", "hotel_widget");
    window.open(tracked, "_blank", "noopener,noreferrer");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-md p-5 sm:p-6 ${className}`.trim()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
          <Hotel className="w-5 h-5 text-teal-700" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Hoteles en {destination}</h3>
          <p className="text-xs text-gray-500">70+ sitios comparados (Booking, Expedia, Hotels.com…)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <label className="block">
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </label>

        <label className="block">
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Users className="w-3 h-3" /> Huéspedes
          </span>
          <select
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "adulto" : "adultos"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg py-2.5 text-sm transition"
      >
        <Search className="w-4 h-4" />
        Comparar precios en {destination}
      </button>
    </div>
  );
}
