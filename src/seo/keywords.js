// SEO Keywords for SKY GROWERS (NZ)
// 200+ base keywords + dynamic generation for 500+ total keywords
// Updated: Jan 2026 with trending NZ search terms

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
  "organic",
  "chemical free",
  "spray free",
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
  "find",
  "get",
  "purchase",
];

const locations = [
  "New Zealand",
  "NZ",
  "Aotearoa",
  "Christchurch",
  "Canterbury",
  "South Island",
  "Canterbury region",
  "Riccarton",
  "Fendalton",
  "Merivale",
  "Rangiora",
  "Rolleston",
  "Lincoln",
  "Selwyn",
];

// 100 Original High-Impact Keywords
const baseOriginal = [
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

// 100 NEW Trending NZ Keywords (2026)
const baseTrending = [
  // Organic & Sustainable (trending in NZ)
  "organic produce delivery NZ",
  "organic food suppliers Christchurch",
  "local farmers market Canterbury",
  "wholesale organic produce NZ",
  "sustainable farming practices NZ",
  "farm-to-table suppliers Christchurch",
  "eco-friendly produce NZ",
  "online produce market NZ",
  "organic vegetable suppliers Canterbury",
  "local food producers NZ",
  // Delivery & Service (high search volume)
  "farmers market delivery Christchurch",
  "organic food wholesalers NZ",
  "fresh produce suppliers Canterbury",
  "local organic farms NZ",
  "farm-to-door delivery Christchurch",
  "online farmers market NZ",
  "fresh vegetable delivery Christchurch",
  "organic produce suppliers Canterbury",
  "local produce markets NZ",
  "farmers market online Christchurch",
  // B2B & Commercial
  "organic food distributors NZ",
  "sustainable food production NZ",
  "local organic produce NZ",
  "farm-to-home delivery Christchurch",
  "online vegetable market NZ",
  "fresh produce delivery Canterbury",
  "organic vegetable suppliers Christchurch",
  "local food markets NZ",
  "farmers market delivery Canterbury",
  "organic food suppliers NZ",
  // Quality & Premium
  "sustainable farming NZ",
  "fresh vegetable suppliers Christchurch",
  "local organic food NZ",
  "farm-to-table delivery Canterbury",
  "eco-friendly food suppliers NZ",
  "online produce suppliers NZ",
  "organic vegetable suppliers NZ",
  "local food suppliers NZ",
  "farmers market delivery NZ",
  "organic food markets NZ",
  // Location-specific (Canterbury suburbs)
  "sustainable food suppliers NZ",
  "local organic farms Canterbury",
  "farm-to-home delivery NZ",
  "eco-friendly produce suppliers NZ",
  "online vegetable suppliers NZ",
  "fresh produce delivery Christchurch",
  "organic vegetable delivery NZ",
  "local food markets Canterbury",
  "farmers market online NZ",
  "organic food suppliers Canterbury",
  // Sustainability focus
  "sustainable farming practices Canterbury",
  "fresh vegetable suppliers NZ",
  "local organic food Christchurch",
  "farm-to-table delivery NZ",
  "online produce delivery NZ",
  "organic produce delivery Christchurch",
  "local produce delivery NZ",
  "farmers market Christchurch",
  "organic food delivery Christchurch",
  "sustainable agriculture practices Christchurch",
  // Long-tail location keywords
  "organic produce delivery Riccarton",
  "fresh produce suppliers Rangiora",
  "local farm produce Rolleston",
  "sustainable farms Selwyn",
  "organic produce markets Lincoln",
  "vegetable delivery Fendalton",
  "farm fresh produce Merivale",
  "local growers Selwyn district",
  "organic farm Canterbury plains",
  "fresh vegetables Waimakariri",
  // Industry-specific
  "restaurant produce supplier Christchurch",
  "catering vegetable supply NZ",
  "hotel kitchen suppliers Canterbury",
  "cafe fresh produce NZ",
  "food service delivery Christchurch",
  "commercial kitchen vegetables NZ",
  "hospitality food suppliers Canterbury",
  "bulk catering produce NZ",
  "restaurant quality vegetables Christchurch",
  "chef sourced produce NZ",
  // Modern consumer trends
  "zero waste produce NZ",
  "plastic free vegetables Christchurch",
  "carbon neutral farm NZ",
  "locally sourced food Canterbury",
  "paddock to plate NZ",
  "clean eating vegetables Christchurch",
  "healthy produce delivery NZ",
  "nutrient dense vegetables Canterbury",
  "chemical free produce NZ",
  "spray free vegetables Christchurch",
  // Subscription & recurring
  "weekly veggie box NZ",
  "produce subscription Christchurch",
  "farm share Canterbury",
  "CSA box NZ",
  "seasonal subscription box Christchurch",
  "regular vegetable delivery NZ",
  "recurring produce order Canterbury",
  "auto-delivery vegetables NZ",
  "standing order produce Christchurch",
  "weekly farm delivery Canterbury",
];

const base = [...baseOriginal, ...baseTrending];

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

// Export 500 keywords for comprehensive coverage
const KEYWORDS = Array.from(combined).slice(0, 500);

export { KEYWORDS };
