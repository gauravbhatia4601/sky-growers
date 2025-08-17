import React from "react";

type JsonObject = Record<string, unknown>;

export default function SeoJsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  const arrayData = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // We stringify here to avoid rehydration differences; this is safe since it's static structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(arrayData) }}
    />
  );
}


