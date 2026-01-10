// SEO Keywords for SKY GROWERS (NZ)
// Combines base keywords with dynamic generation for ~350+ keywords

// Produce already on site pages
const vegetables = [
  "vegetables",
  "produce",
  "greens",
  "coriander",
  "cilantro",
  "spinach",
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
  "pumpkin",
  "butternut",
  "cucumber",
];

const modifiers = [
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

// 100 High-Impact Base Keywords
const base = [
  "Sky Growers Christchurch",
  "Sky Growers Canterbury",
  "Sky Growers New Zealand",
  "Sky Growers NZ",
  "Sky Growers farm",
  "Sky Growers wholesale",
  "Sky Growers delivery",
  "Sky Growers vegetables",
  "Sky Growers produce",
  "Bhatti family farm Christchurch",
  "vegetable farm Christchurch",
  "fresh produce Christchurch",
  "farm fresh vegetables Canterbury",
  "local vegetables Christchurch NZ",
  "vegetable supplier Christchurch",
  "produce delivery Christchurch",
  "wholesale vegetables Canterbury",
  "farm vegetables South Island",
  "Christchurch vegetable delivery",
  "Canterbury farm produce",
  "vegetables near me Christchurch",
  "local farm near me NZ",
  "farm to table Christchurch",
  "farm to fork Canterbury",
  "local growers Christchurch",
  "wholesale vegetable supplier NZ",
  "bulk vegetables Christchurch",
  "restaurant vegetable supplier Canterbury",
  "cafe produce supplier NZ",
  "hotel vegetable supplier Christchurch",
  "hospitality produce NZ",
  "horeca supplier New Zealand",
  "food service vegetables NZ",
  "commercial vegetable supply",
  "bulk produce wholesale NZ",
  "vegetable distributor Canterbury",
  "grocery supplier Christchurch",
  "supermarket vegetable supplier NZ",
  "wholesale greens NZ",
  "bulk farm produce Canterbury",
  "fresh coriander Christchurch",
  "coriander supplier NZ",
  "spring onion farm NZ",
  "radish supplier Christchurch",
  "cucumber farm Canterbury",
  "butternut squash NZ",
  "pumpkin farm Christchurch",
  "fresh spinach Canterbury",
  "beetroot supplier NZ",
  "fresh herbs Christchurch",
  "microgreens NZ",
  "leafy greens supplier NZ",
  "salad mix Christchurch",
  "fresh produce supplier Canterbury",
  "seasonal vegetables NZ",
  "sustainable farm NZ",
  "regenerative farming Christchurch",
  "eco friendly vegetables NZ",
  "pesticide free vegetables Canterbury",
  "sustainable agriculture NZ",
  "natural farming Christchurch",
  "sustainable produce NZ",
  "regenerative agriculture Canterbury",
  "environmentally friendly farm NZ",
  "sustainable vegetable grower NZ",
  "premium vegetables NZ",
  "high quality produce Canterbury",
  "artisanal vegetables Christchurch",
  "hand picked vegetables NZ",
  "family owned farm Christchurch",
  "heritage farming NZ",
  "traditional farming Canterbury",
  "quality assured produce NZ",
  "GAP certified farm NZ",
  "food safety certified vegetables NZ",
  "vegetable delivery NZ",
  "produce home delivery Christchurch",
  "next day vegetable delivery Canterbury",
  "farm box delivery Christchurch",
  "fresh vegetable subscription NZ",
  "weekly vegetable delivery Canterbury",
  "same day produce Christchurch",
  "direct farm delivery NZ",
  "vegetable box Christchurch",
  "farm fresh delivery Canterbury",
  "buy vegetables online NZ",
  "order fresh produce Christchurch",
  "vegetable prices NZ",
  "wholesale produce prices Canterbury",
  "farm fresh quote NZ",
  "bulk order vegetables Christchurch",
  "vegetable farm contact NZ",
  "fresh produce online order",
  "vegetables for restaurants NZ",
  "commercial produce order Canterbury",
  "vegetable grower South Island NZ",
  "Canterbury region vegetable farm",
  "local produce Canterbury NZ",
  "Christchurch area farm vegetables",
  "New Zealand South Island farm produce",
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

// Limit to ~400 keywords
const KEYWORDS = Array.from(combined).slice(0, 400);

export { KEYWORDS };
