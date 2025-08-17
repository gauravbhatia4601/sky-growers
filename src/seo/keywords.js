// Generated SEO keyword list for SKY GROWERS (NZ). We intentionally combine
// vegetables, intents, modifiers, and NZ locations to produce ~350 keywords.

const vegetables = [
  "vegetables",
  "produce",
  "greens",
  "coriander",
  "cilantro",
  "spinach",
  "beetroot",
  "radish",
  "lettuce",
  "kale",
  "silverbeet",
  "rocket",
  "arugula",
  "spring onions",
  "parsley",
  "mint",
  "basil",
  "microgreens",
  "salad mix",
  "leafy greens",
  "root vegetables",
  "herbs",
  "seasonal produce",
  "fresh produce",
  "local produce",
];

const modifiers = [
  "organic",
  "certified organic",
  "spray-free",
  "pesticide-free",
  "chemical-free",
  "natural",
  "farm fresh",
  "fresh",
  "locally grown",
  "local",
  "regeneratively grown",
  "regenerative",
  "sustainably grown",
  "sustainable",
  "eco-friendly",
  "seasonal",
  "in-season",
  "artisanal",
  "premium",
  "wholesale",
  "bulk",
  "restaurant supply",
  "grocery supply",
  "farm to table",
  "farm-to-table",
  "direct from farm",
  "delivery",
  "home delivery",
  "same-day",
  "next-day",
  "best",
  "top quality",
  "high quality",
  "year-round",
  "seasonal availability",
];

const intents = [
  "buy",
  "order",
  "shop",
  "supplier",
  "wholesale supplier",
  "bulk supplier",
  "distributor",
  "delivery",
  "near me",
  "price",
  "prices",
  "cost",
  "quote",
  "wholesale pricing",
  "CSA",
  "subscription",
  "farm box",
  "market",
];

const locations = [
  "New Zealand",
  "NZ",
  "Aotearoa",
  "Christchurch",
  "Canterbury",
  "South Island",
  "Canterbury region",
];

// Base standalone keywords
const base = [
  "SKY GROWERS",
  "Sky Growers New Zealand",
  "Sky Growers Christchurch",
  "premium vegetables NZ",
  "organic vegetables NZ",
  "fresh vegetables NZ",
  "farm fresh vegetables Christchurch",
  "local farm Christchurch",
  "vegetable delivery Christchurch",
  "wholesale vegetables Canterbury",
  "restaurant vegetable supplier NZ",
  "grocery produce supplier NZ",
  "sustainable farm New Zealand",
  "pesticide-free vegetables NZ",
  "regenerative farming NZ",
  "farm to table Christchurch",
  "seasonal produce NZ",
  "microgreens NZ",
  "leafy greens NZ",
  "bulk produce NZ",
];

function titleCase(str) {
  return str
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

const combined = new Set();

// Add base first
base.forEach((k) => combined.add(k));

// Generate combinations: [modifier] [veg] [location]
for (const m of modifiers) {
  for (const v of vegetables) {
    for (const loc of locations) {
      combined.add(`${m} ${v} ${loc}`);
      combined.add(`${titleCase(m)} ${titleCase(v)} ${loc}`);
    }
  }
}

// Generate combinations: [intent] [veg] [location]
for (const i of intents) {
  for (const v of vegetables) {
    for (const loc of locations) {
      combined.add(`${i} ${v} ${loc}`);
      combined.add(`${titleCase(i)} ${titleCase(v)} ${loc}`);
    }
  }
}

// Generate combinations: [modifier] [intent] [veg] [location]
for (const m of modifiers) {
  for (const i of intents) {
    for (const v of vegetables) {
      for (const loc of locations) {
        combined.add(`${m} ${i} ${v} ${loc}`);
      }
    }
  }
}

// Turn into array, limit to ~380 to keep metadata reasonable
const KEYWORDS = Array.from(combined).slice(0, 380);

export { KEYWORDS };


