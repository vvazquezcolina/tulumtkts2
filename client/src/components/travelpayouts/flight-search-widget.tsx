import { Plane, Search, ArrowRight } from "lucide-react";
import { generateFlightLink, trackAffiliateClick } from "@/lib/affiliate";

export interface FlightSearchWidgetProps {
  /** Pre-fill the destination IATA. Defaults to CUN (Cancún). */
  destination?: string;
  /** Pre-fill the origin IATA. Optional. */
  origin?: string;
  className?: string;
}

const POPULAR_ORIGINS: ReadonlyArray<{ code: string; flag: string; city: string }> = [
  { code: "MEX", flag: "🇲🇽", city: "CDMX" },
  { code: "JFK", flag: "🇺🇸", city: "New York" },
  { code: "LAX", flag: "🇺🇸", city: "Los Angeles" },
  { code: "MIA", flag: "🇺🇸", city: "Miami" },
  { code: "MAD", flag: "🇪🇸", city: "Madrid" },
  { code: "YYZ", flag: "🇨🇦", city: "Toronto" },
];

/**
 * Quick-launcher banner for Aviasales flight search. Originally an iframe
 * widget loaded from `c121.travelpayouts.com`, but that endpoint requires a
 * per-account hash from the TP dashboard — without the hash it returns 400
 * and the iframe never paints. This component renders a React equivalent that
 * uses our `generateFlightLink` (Aviasales URL with `?marker=` injected — the
 * affiliate path that's confirmed working with a 302 to a marker-tagged search
 * result) so visitors get a single-click CTA instead of a blank box.
 */
export function FlightSearchWidget({
  destination = "CUN",
  className = "",
}: FlightSearchWidgetProps) {
  const handleClick = (originCode: string) => {
    const url = generateFlightLink(originCode, destination);
    trackAffiliateClick("aviasales", `${originCode} → ${destination}`, "flight", "vuelos_widget");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 shadow-sm ${className}`.trim()}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
          <Plane className="w-5 h-5 text-teal-700" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Vuelos a {destination}</h3>
          <p className="text-xs text-gray-500">Compara 100+ aerolíneas en Aviasales</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {POPULAR_ORIGINS.map((o) => (
          <button
            key={o.code}
            type="button"
            onClick={() => handleClick(o.code)}
            className="flex items-center justify-between gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-teal-400 hover:shadow-sm transition text-left text-sm"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span aria-hidden="true">{o.flag}</span>
              <span className="font-medium text-gray-900 truncate">{o.city}</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => handleClick("")}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg py-2.5 text-sm transition"
      >
        <Search className="w-4 h-4" />
        Buscar todos los vuelos a {destination}
      </button>
    </div>
  );
}
