import { useEffect, useRef } from "react";

const GYG_PARTNER_ID = "EBGURF8";
const GYG_SCRIPT_SRC = "https://widget.getyourguide.com/dist/pa.umd.production.min.js";
const GYG_SCRIPT_ID = "gyg-widget-loader";

type GygWidgetType =
  | "activities"
  | "city"
  | "auto"
  | "availability";

export interface GetYourGuideWidgetProps {
  /** Search query when widget is type="activities" — e.g. "Tulum cenotes". */
  query?: string;
  /** Numeric GetYourGuide location id (Tulum = 248). Used by the "city" widget. */
  locationId?: number;
  /** Comma-separated list of activity ids — e.g. "814206,600898". Used by the "availability" widget. */
  tourIds?: string;
  /** Widget layout. Defaults to "activities" (a horizontal carousel of tours). */
  variant?: GygWidgetType;
  /** Locale (`en-US`, `es-MX`, `fr-FR`). Defaults to `es-MX`. */
  localeCode?: string;
  /** Currency. Defaults to `USD`. */
  currency?: "USD" | "MXN" | "EUR" | "GBP" | "CAD";
  /** How many cards to render (when applicable). */
  numberOfItems?: number;
  className?: string;
}

/**
 * Embeds the official GetYourGuide partner widget. Bookings made via this
 * widget are attributed to the `EBGURF8` partner id — the same id stored in
 * the activities CSV — so commissions land in the same TP/GYG account.
 *
 * The GetYourGuide widget script is loaded once per page and then auto-mounts
 * any `[data-gyg-widget]` element on the page.
 */
export function GetYourGuideWidget({
  query = "Tulum",
  locationId,
  tourIds,
  variant = "activities",
  localeCode = "es-MX",
  currency = "USD",
  numberOfItems = 6,
  className = "",
}: GetYourGuideWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(GYG_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = GYG_SCRIPT_ID;
    script.src = GYG_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const dataAttrs: Record<string, string> = {
    "data-gyg-widget": variant,
    "data-gyg-partner-id": GYG_PARTNER_ID,
    "data-gyg-locale-code": localeCode,
    "data-gyg-currency": currency,
    "data-gyg-cmp": "tulumtkts",
  };

  if (variant === "city" && locationId) {
    dataAttrs["data-gyg-location-id"] = String(locationId);
  }
  if ((variant === "activities" || variant === "auto") && query) {
    dataAttrs["data-gyg-q"] = query;
  }
  if (variant === "availability" && tourIds) {
    dataAttrs["data-gyg-tour-ids"] = tourIds;
  }
  if (variant === "activities" || variant === "auto") {
    dataAttrs["data-gyg-number-of-items"] = String(numberOfItems);
  }

  return (
    <div
      ref={containerRef}
      className={`gyg-widget-frame ${className}`.trim()}
      {...dataAttrs}
    />
  );
}
