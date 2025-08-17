export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "SKY GROWERS",
  tagline: "Premium Farm-Fresh Vegetables",
  defaultDescription:
    "Premium farm-fresh vegetables in Christchurch, New Zealand. Sustainable, and year-round supply.",
  locale: "en_NZ",
  phone: "+64 27 730 0400",
  city: "Christchurch",
  region: "Canterbury",
  country: "New Zealand",
};

export function buildCanonical(pathname: string): string {
  const base = getBaseUrl();
  if (!pathname) return base;
  return `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}


