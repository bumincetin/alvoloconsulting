"use client";

import { useEffect, useState } from "react";
import { CITIES, CITY_ORDER, type CityId } from "@/lib/geo/cities";

const PLACEHOLDER = "--:--:--";

/**
 * Live HH:mm:ss clocks for the corridor cities, formatted in the visitor's locale.
 * Renders placeholders on the server and during hydration so markup matches.
 */
export function useCityClocks(locale: string, withSeconds = true): Record<CityId, string> {
  const [times, setTimes] = useState<Record<CityId, string>>({ milan: PLACEHOLDER, rome: PLACEHOLDER, istanbul: PLACEHOLDER });

  useEffect(() => {
    const formatters = Object.fromEntries(
      CITY_ORDER.map((id) => [
        id,
        new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: withSeconds ? "2-digit" : undefined,
          hour12: false,
          timeZone: CITIES[id].tz,
        }),
      ]),
    ) as Record<CityId, Intl.DateTimeFormat>;

    const tick = () => {
      const now = new Date();
      setTimes({
        milan: formatters.milan.format(now),
        rome: formatters.rome.format(now),
        istanbul: formatters.istanbul.format(now),
      });
    };
    tick();
    const id = window.setInterval(tick, withSeconds ? 1000 : 15000);
    return () => window.clearInterval(id);
  }, [locale, withSeconds]);

  return times;
}
