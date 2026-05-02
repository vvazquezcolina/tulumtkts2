import { useEffect, useRef } from "react";

const TP_MARKER = "9a350c3ebd492165ade7135359165af9";

export interface FlightSearchWidgetProps {
  /** UI locale: `en`, `es`, `fr`. Defaults to `es`. */
  locale?: "en" | "es" | "fr";
  /** Currency code (lowercase). Defaults to `usd`. */
  currency?: "usd" | "mxn" | "eur" | "gbp" | "cad";
  /** Pre-fill the destination IATA. Defaults to CUN (Cancún). */
  destination?: string;
  /** Pre-fill the origin IATA. Optional. */
  origin?: string;
  className?: string;
}

/**
 * Embeds the public Aviasales / Travelpayouts flight-search white label.
 * Loads `c121.travelpayouts.com/content` which renders an iframe-based form
 * inside the host element. All clicks attribute to `TP_MARKER`.
 *
 * Scripts inserted by this component target a DOM node we control so we can
 * unmount cleanly when the page navigates away.
 */
export function FlightSearchWidget({
  locale = "es",
  currency = "usd",
  destination = "CUN",
  origin,
  className = "",
}: FlightSearchWidgetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = "";

    const params = new URLSearchParams({
      promo_id: "3414",
      campaign_id: "100",
      shmarker: TP_MARKER,
      locale,
      currency,
      powered_by: "true",
      origin: origin || "",
      destination,
      with_fallback: "true",
      no_labels: "false",
      no_request_form: "true",
      plain: "true",
      color_button: "#0f766e",
      color_icons: "#0f766e",
      primary: "#0f766e",
      promo_label: "false",
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
  }, [locale, currency, destination, origin]);

  return <div ref={hostRef} className={`tp-widget-host ${className}`.trim()} />;
}
