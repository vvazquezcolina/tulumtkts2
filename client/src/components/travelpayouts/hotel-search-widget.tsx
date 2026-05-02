import { useEffect, useRef } from "react";

const TP_MARKER = "9a350c3ebd492165ade7135359165af9";

export interface HotelSearchWidgetProps {
  locale?: "en" | "es" | "fr";
  currency?: "usd" | "mxn" | "eur" | "gbp" | "cad";
  /** Pre-fill the destination. Free-form (city name) — Hotellook resolves it. */
  destination?: string;
  className?: string;
}

/**
 * Embeds the public Hotellook / Travelpayouts hotel-search white label form.
 * Bookings attribute to `TP_MARKER`.
 */
export function HotelSearchWidget({
  locale = "es",
  currency = "usd",
  destination = "Tulum",
  className = "",
}: HotelSearchWidgetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const params = new URLSearchParams({
      promo_id: "4038",
      campaign_id: "101",
      shmarker: TP_MARKER,
      locale,
      currency,
      destination,
      powered_by: "true",
      hotel_id: "",
      check_in: "",
      check_out: "",
      adults: "2",
      children: "0",
      primary: "#0f766e",
      special: "#FFFFFF",
      promo_label: "false",
      no_labels: "false",
      plain: "true",
      type: "init",
    });

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = `https://c121.travelpayouts.com/content?${params.toString()}`;
    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
  }, [locale, currency, destination]);

  return <div ref={hostRef} className={`tp-widget-host ${className}`.trim()} />;
}
