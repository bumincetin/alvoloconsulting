"use client";

import { useParams } from "next/navigation";
import HomeShore from "@/components/shore/HomeShore";
import { locales, type Locale } from "@/lib/translations";

function resolveLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value) ? (value as Locale) : "en";
}

export default function HomePageClient() {
  const params = useParams();
  const locale = resolveLocale(params?.locale);
  return (
    <main className="relative">
      <HomeShore locale={locale} />
    </main>
  );
}
